export type FailResponse = {
    message: string;
    errors: {
        [fieldName: string]: string[];
    };
};
