import { fetchWithTimeout } from "../utils/helpers";
import {Transaction} from '../utils/types'

export async function getTransactions(address: string) {
  return await fetchWithTimeout<{items: Transaction[]}>(
    `https://scan-testnet.assetchain.org/api/v2/addresses/${address}/transactions`
  );
}

export async function getTransactionByhash(hash: string) {
    return await fetchWithTimeout<Transaction>(
      `https://scan-testnet.assetchain.org/api/v2/transactions/${hash}`
    );
  }
