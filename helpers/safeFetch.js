async function safeFetch(url, options = {}) {
  const {
    timeout = 10000,
    parseJson = true,
    ...fetchOptions
  } = options;

  // Validate URL
  try {
    new URL(url);
  } catch (error) {
    return {
      ok: false,
      message: "Invalid URL",
      error: "The provided URL is malformed or invalid",
    };
  }

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Extract headers
    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    // Handle non-OK responses
    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      let errorDetails = response.statusText;

      // Try to parse error body if it exists
      try {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorBody = await response.json();
          errorDetails = errorBody.message || errorBody.error || response.statusText;
        } else {
          const textBody = await response.text();
          if (textBody) {
            errorDetails = textBody.substring(0, 200); // Limit error text length
          }
        }
      } catch (parseError) {
        // If parsing fails, use statusText
      }

      return {
        ok: false,
        status: response.status,
        statusText: response.statusText,
        message: errorMessage,
        error: errorDetails,
        headers,
      };
    }

    // Handle successful response
    let data;

    if (parseJson) {
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        try {
          data = await response.json();
        } catch (jsonError) {
          return {
            ok: false,
            status: response.status,
            statusText: response.statusText,
            message: "Failed to parse JSON response",
            error: jsonError.message,
            headers,
          };
        }
      } else {
        // If not JSON, return as text
        data = await response.text();
      }
    } else {
      // If parseJson is false, return as text
      data = await response.text();
    }

    return {
      ok: true,
      status: response.status,
      statusText: response.statusText,
      message: "Request successful",
      data,
      headers,
    };

  } catch (error) {
    clearTimeout(timeoutId);

    // Handle different types of errors
    if (error.name === "AbortError") {
      return {
        ok: false,
        message: "Request timeout",
        error: `Request exceeded ${timeout}ms timeout`,
      };
    }

    if (error.message.includes("fetch")) {
      return {
        ok: false,
        message: "Network error",
        error: "Failed to connect to the server. Please check your internet connection.",
      };
    }

    if (error.code === "ENOTFOUND") {
      return {
        ok: false,
        message: "DNS resolution failed",
        error: "Could not resolve the hostname. The server may not exist.",
      };
    }

    if (error.code === "ECONNREFUSED") {
      return {
        ok: false,
        message: "Connection refused",
        error: "The server refused the connection.",
      };
    }

    if (error.code === "ETIMEDOUT") {
      return {
        ok: false,
        message: "Connection timeout",
        error: "The connection to the server timed out.",
      };
    }

    // Generic error
    return {
      ok: false,
      message: "Request failed",
      error: error.message || "An unknown error occurred",
    };
  }
}

export default safeFetch;
