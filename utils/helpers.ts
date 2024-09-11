export function isValidEthereumAddress(address: string) {
  if (typeof address !== "string" || address.length !== 42) {
    return false;
  }

  if (!address.startsWith("0x")) {
    return false;
  }
  const addressWithoutPrefix = address.slice(2);

  const hexRegex = /^[0-9a-fA-F]{40}$/;
  if (!hexRegex.test(addressWithoutPrefix)) {
    return false;
  }

  return true;
}
