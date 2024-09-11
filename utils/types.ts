interface To {
  ens_domain_name: null;
  hash: string;
  implementations: any[];
  is_contract: boolean;
  is_verified: boolean;
  metadata: null;
  name: string;
  private_tags: any[];
  proxy_type: null;
  public_tags: any[];
  watchlist_names: any[];
}

interface Fee {
  type: string;
  value: string;
}
export interface Transaction {
  timestamp: string;
  fee: Fee;
  gas_limit: string;
  block: number;
  status: string;
  method: string;
  confirmations: number;
  type: number;
  exchange_rate: string;
  to: To;
  tx_burnt_fee: string;
  max_fee_per_gas: string;
  result: string;
  hash: string;
  gas_price: string;
  priority_fee: string;
  base_fee_per_gas: string;
  from: To;
  token_transfers: null;
  tx_types: string[];
  gas_used: string;
  created_contract: null;
  position: number;
  nonce: number;
  has_error_in_internal_txs: boolean;
  actions: any[];
  decoded_input: null;
  token_transfers_overflow: null;
  raw_input: string;
  value: string;
  max_priority_fee_per_gas: null;
  revert_reason: null;
  confirmation_duration: number[];
  tx_tag: null;
}
