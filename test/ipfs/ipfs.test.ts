import { expect, describe, test } from 'bun:test';
import { bitagent } from '../../src';

describe('Upload to ipfs', () => {
  test(`Upload to IPFS`, async () => {
    const buffer = await (await fetch('https://picsum.photos/200')).arrayBuffer();
    const hash = await bitagent.ipfs.upload({
      pinataApiKey: process.env.PINATA_API_KEY!,
      media: new Blob([buffer], { type: 'image/png' }),
    });
    console.log(hash);
    expect(hash).toBeDefined();
  });
});
