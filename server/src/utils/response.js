import { getReasonPhrase } from "http-status-codes";

const statusCode = (code) => getReasonPhrase(code) || "Unknown";

export const response = (res, status, message, data = null, errors = []) => {

    return res.status(status).json({
        code: status,
        status: statusCode(status),
        payload: data,
        errors,
        message,
    });
};
