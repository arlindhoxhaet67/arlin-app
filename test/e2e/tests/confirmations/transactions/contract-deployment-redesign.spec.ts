import { openDapp, unlockWallet } from '../../../helpers';
import {
  confirmDepositTransaction,
  confirmRedesignedContractDeploymentTransaction,
  createContractDeploymentTransaction,
  createDepositTransaction,
  TestSuiteArguments,
} from './shared';
import { withFixtures } from '../../../helpers';
import FixtureBuilder from '../../../fixture-builder';

describe('Confirmation Redesign Contract Deployment Component', function () {
  describe('Create a deploy transaction', function () {
    it('Sends a contract interaction type 0 transaction (Legacy)', async function () {
      await withFixtures({
        dapp: true,
        fixtures: new FixtureBuilder().withPermissionControllerConnectedToTestDapp().build(),
        localNodeOptions: { hardfork: 'muirGlacier' },
        title: this.test?.fullTitle(),
      }, async ({ driver }: TestSuiteArguments) => {
        await unlockWallet(driver);
        await openDapp(driver);
        await createContractDeploymentTransaction(driver);
        await confirmRedesignedContractDeploymentTransaction(driver);
        await createDepositTransaction(driver);
        await confirmDepositTransaction(driver);
      });
    });

    it('Sends a contract interaction type 2 transaction (EIP1559)', async function () {
      await withFixtures({
        dapp: true,
        fixtures: new FixtureBuilder().withPermissionControllerConnectedToTestDapp().build(),
        title: this.test?.fullTitle(),
      }, async ({ driver }: TestSuiteArguments) => {
        await unlockWallet(driver);
        await openDapp(driver);
        await createContractDeploymentTransaction(driver);
        await confirmRedesignedContractDeploymentTransaction(driver);
        await createDepositTransaction(driver);
        await confirmDepositTransaction(driver);
      });
    });
  });
});
