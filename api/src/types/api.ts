/**
 * An RFC-8707 error describing a 4XX/5XX response from the server.
 */
export class ApiError extends Error {
    /**
     * A human-readable title.
     */
    readonly title: string;
    /**
     * A human-readable explanation of the error.
     */
    readonly detail: string;
    /**
     * The HTTP status code.
     */
    readonly status: number;

    // arbitrary json that can help with troubleshooting
    readonly data?: Record<string, unknown>;

    constructor(
        title: string,
        detail: string,
        status: number,
        data?: Record<string, unknown>
    ) {
        super(title);
        this.title = title;
        this.detail = detail;
        this.status = status;
        this.data = data;
    }
}
