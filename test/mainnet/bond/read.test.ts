import { describe, expect, test } from 'bun:test';
import { ALL_CHAINS, getCreationFee } from '../../utils';
import { bitagent, type LowerCaseChainNames } from '../../../src';

function testAll(cb: (network: LowerCaseChainNames) => void) {
  ALL_CHAINS.forEach((name) => {
    cb(name);
  });
}

describe('Bond Contract', () => {
  testAll((network) => {
    test(`${network} - getCreationFee`, async () => {
      const creationFee = await bitagent.network(network).bond.getCreationFee();
      expect(creationFee).toEqual(getCreationFee(network));
    });
  });
});
