import {
    useMutation,
    UseMutationOptions,
    useQuery,
    UseQueryOptions
} from "@tanstack/react-query";
import type {
    CreateReviewRequest,
    GetProductReviewsParams,
    GetProductReviewsResponseData,
    ProductReview,
    UpdateReviewRequest
} from "../../../types/marketplace.types";
import type { ApiResponse } from "../../../types/user";
import { showError, successMesssage } from "../../../utils/message";
import apiClient from "../../apiClient";

/**
 * Hook to submit a review for a product.
 * POST /marketplace/products/:productId/reviews
 */
export const useCreateReview = (
  options?: UseMutationOptions<
    ApiResponse<ProductReview>,
    Error,
    { productId: string; payload: CreateReviewRequest }
  >
) => {
  return useMutation<
    ApiResponse<ProductReview>,
    Error,
    { productId: string; payload: CreateReviewRequest }
  >({
    mutationFn: async ({ productId, payload }) => {
      const formData = new FormData();

      if (payload.rating !== undefined) {
        formData.append("rating", String(payload.rating));
      }
      if (payload.comment !== undefined && payload.comment !== null) {
        formData.append("comment", payload.comment);
      }

      if (payload.images && payload.images.length > 0) {
        payload.images.forEach((file) => {
          formData.append("images", file);
        });
      }

      const response = await apiClient.post<ApiResponse<ProductReview>>(
        `/marketplace/products/${productId}/reviews`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    ...options,
    onError: (error) => showError(error),
    onSuccess: () => successMesssage("Review submitted successfully"),
  });
};

/**
 * Hook to update an existing review.
 * PUT /marketplace/reviews/:id
 */
export const useUpdateReview = (
  options?: UseMutationOptions<
    ApiResponse<ProductReview>,
    Error,
    { id: string; payload: UpdateReviewRequest }
  >
) => {
  return useMutation<
    ApiResponse<ProductReview>,
    Error,
    { id: string; payload: UpdateReviewRequest }
  >({
    mutationFn: async ({ id, payload }) => {
      const formData = new FormData();

      if (payload.rating !== undefined) {
        formData.append("rating", String(payload.rating));
      }
      if (payload.comment !== undefined && payload.comment !== null) {
        formData.append("comment", payload.comment);
      }

      if (payload.images && payload.images.length > 0) {
        payload.images.forEach((file) => {
          formData.append("images", file);
        });
      }

      if (payload.keepImages !== undefined) {
        formData.append("images", JSON.stringify(payload.keepImages));
      }

      const response = await apiClient.put<ApiResponse<ProductReview>>(
        `/marketplace/reviews/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    ...options,
    onError: (error) => showError(error),
    onSuccess: () => successMesssage("Review updated successfully"),
  });
};

/**
 * Hook to get paginated reviews and review statistics for a product.
 * GET /marketplace/products/:productId/reviews
 */
export const useGetProductReviews = (
  productId: string,
  params?: GetProductReviewsParams,
  options?: Omit<
    UseQueryOptions<ApiResponse<GetProductReviewsResponseData>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<ApiResponse<GetProductReviewsResponseData>, Error>({
    queryKey: ["marketplace", "reviews", productId, params],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<GetProductReviewsResponseData>>(
        `/marketplace/products/${productId}/reviews`,
        { params }
      );
      return response.data;
    },
    enabled: !!productId && (options?.enabled ?? true),
    ...options,
  });
};

/**
 * Hook to delete a review.
 * DELETE /marketplace/reviews/:id
 */
export const useDeleteReview = (
  options?: UseMutationOptions<ApiResponse<null>, Error, string>
) => {
  return useMutation<ApiResponse<null>, Error, string>({
    mutationFn: async (id) => {
      const response = await apiClient.delete<ApiResponse<null>>(
        `/marketplace/reviews/${id}`
      );
      return response.data;
    },
    ...options,
    onError: (error) => showError(error),
    onSuccess: () => successMesssage("Review deleted successfully"),
  });
};
