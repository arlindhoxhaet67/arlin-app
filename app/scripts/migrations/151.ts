import { cloneDeep } from 'lodash';

type VersionedData = {
  meta: { version: number };
  data: Record<string, unknown>;
};

export const version = 151;

export async function migrate(
  originalVersionedData: VersionedData,
): Promise<VersionedData> {
  const versionedData = cloneDeep(originalVersionedData);
  versionedData.meta.version = version;
  const preferencesControllerState = versionedData.data?.PreferencesController;
  delete preferencesControllerState?.incomingTransactionsPreferences;
  return versionedData;
}
