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

export const fetchWithTimeout = async <T>(
  url: string,
  options?: RequestInit,
  timeout: number = 30000
): Promise<T> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort("request timeout"),
      timeout
    );

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let message = "";
      const errorString = await response.text();
      const errorObj = JSON.parse(errorString);
      if (Array.isArray(errorObj.message)) {
        message = errorObj.message[0];
      } else {
        message = errorObj.message;
      }
      throw new Error(message);
    }
    return await response.json();
  } catch (error: any) {
    const message =
      error.message.toLowerCase() === "aborted"
        ? "Request Timeout"
        : error.message;
    throw new Error(message);
  }
};

export function shortenEthAddress(address: string) {
  if (typeof address !== 'string') return '';
  return address.slice(0, 6) + '...' + address.slice(-4);
}

export function capitalizeFirstLetter(value: string) {
  return value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}

