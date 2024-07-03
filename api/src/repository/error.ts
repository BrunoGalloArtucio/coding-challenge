export class RepositoryError extends Error {
    /**
     * A human-readable title.
     */
    readonly title: string;
    /**
     * A human-readable explanation of the error.
     */
    readonly detail: string;

    /**
     * error returned from the DB
     */
    readonly error?: any;

    constructor(title: string, detail: string, error?: any) {
        super(title);
        this.title = title;
        this.detail = detail;
        this.error = error;
    }
}

export class ItemNotFoundError extends RepositoryError {}
