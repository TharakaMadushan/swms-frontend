export const handleApiError = (error: any): string => {
  if (error.response) {
    const apiResponse = error.response.data;
    
    if (apiResponse?.message) {
      return apiResponse.message;
    }

    if (apiResponse?.errors && Array.isArray(apiResponse.errors)) {
      return apiResponse.errors.join(', ');
    }

    if (error.response.status === 401) {
      return 'Unauthorized. Please login again.';
    }

    if (error.response.status === 403) {
      return 'You do not have permission to perform this action.';
    }

    if (error.response.status === 404) {
      return 'Resource not found.';
    }

    if (error.response.status === 500) {
      return 'Server error. Please try again later.';
    }
  } else if (error.request) {
    return 'Network error. Please check your connection.';
  }

  return error.message || 'An unexpected error occurred';
};