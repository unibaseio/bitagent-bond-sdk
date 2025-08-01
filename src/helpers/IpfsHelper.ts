import { PinataSDK } from 'pinata-web3';
import { PinataKeyNeededErrror, InvalidImageProvidedError } from '../errors/sdk.errors';
import { IpfsHashUrl, MediaUploadParams, MetadataUploadParams, NFTMetadata } from '../types/ipfs.types';

export class Ipfs {
  public async add(apiKey: string, blob: Blob): Promise<string> {
    if (!apiKey) throw new PinataKeyNeededErrror();

    const client = new PinataSDK({ pinataJwt: apiKey, pinataGateway: '' });

    switch (blob.type) {
      case 'image/png':
        const fileUploadResponse = await client.upload.file(new File([blob], Date.now().toString()));
        return fileUploadResponse.IpfsHash;
      case 'application/json':
        const jsonUploadResponse = await client.upload.json(blob.json());
        return jsonUploadResponse.IpfsHash;
      default:
        return '';
    }
  }

  private isIpfsUrl(url: string) {
    return url.toLowerCase().startsWith('ipfs://');
  }

  private isHttpUrl(url: string) {
    return url.toLowerCase().startsWith('http://') || url.toLowerCase().startsWith('https://');
  }

  private validateHttpUrl(url: string) {
    let urlObj;
    try {
      urlObj = new URL(url);
    } catch (e) {
      throw new InvalidImageProvidedError();
    }
    const valid = urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    if (!valid) {
      throw new InvalidImageProvidedError();
    }
    return valid;
  }

  public hashToGatewayUrl(hash: string, gateway = 'https://ipfs.io/ipfs/') {
    if (hash.includes('ipfs://')) {
      hash = hash.replace('ipfs://', '');
    }
    return `${gateway}${hash}`;
  }

  public gatewayUrlToHash(url: string): IpfsHashUrl {
    return ('ipfs://' + url.split('ipfs/').pop()) as IpfsHashUrl;
  }

  public validateIpfsHash(ipfsUrl: string) {
    const hash = ipfsUrl.replace(/^ipfs:\/\//, '');

    // CIDv0, base58, starts with Qm, 46 characters
    const cidv0Pattern = /^Qm[1-9A-HJ-NP-Za-km-z]{44}$/;

    // CIDv1 in base32, starts with b, for simplicity assuming it's at least 50 characters
    // This is a simplified check and might not cover all cases
    const cidv1Pattern = /^b[1-9A-Za-z]{49,}$/;

    const matched = cidv0Pattern.test(hash) || cidv1Pattern.test(hash);

    if (!matched) {
      throw new InvalidImageProvidedError();
    }

    return matched;
  }

  public async upload(params: MediaUploadParams) {
    const { pinataApiKey, media } = params;
    const hash = await this.add(pinataApiKey, media);
    return `ipfs://${hash}`;
  }

  public async uploadMetadata(data: MetadataUploadParams): Promise<IpfsHashUrl> {
    const { pinataApiKey, name, image, video, description, external_url, attributes } = data;

    const defaultExternalLink = `https://bitagent.io`;
    const defaultDescription = [
      `A Bonding Curved ERC-1155 token powered by bitagent.io bonding curve protocol.`,
      defaultExternalLink,
    ].join('\n\n');

    const finalMetadata: NFTMetadata = {
      name,
      description: defaultDescription,
      image,
      external_url: defaultExternalLink,
      attributes: [],
    };

    if (video) {
      finalMetadata.animation_url = video;
    }

    if (description) finalMetadata.description = description;
    if (external_url) finalMetadata.external_url = external_url;
    if (attributes) finalMetadata.attributes = attributes;

    const metadata = JSON.stringify(finalMetadata);
    const metadataBuffer = new Blob([metadata], { type: 'application/json' });
    const jsonHash = await this.add(pinataApiKey, metadataBuffer);

    return `ipfs://${jsonHash}`;
  }
}
