import { response } from "../../utils/response.js";
import { createApiKey } from "../../services/API/createKeys.service.js";
import { getAllApiKeys, getActiveApiKeys, getDeactiveApiKeys } from "../../services/API/getApiKeys.service.js";
import { deactivateApiKey } from "../../services/API/deactiveKeys.service.js";
import { ValidationError } from "../../utils/validationError.js";

export const createKey = async (req, res) => {
    try {
        const { name, description, expiresAt } = req.body;

        if (!name) {
        throw new ValidationError()
            .addError("Name is required")
            .addError("Please provide a name for the API Key");
        }

        const { apiKey, newKey} = await createApiKey({ name, description, expiresAt });
        const result = {
            apiKey,
            id: newKey.id,
            name: newKey.name,
            description: newKey.description,
            createdAt: newKey.createdAt,
            expiresAt: newKey.expiresAt,
        };

        return response(res, 201, "API Key created successfully", result);
    } catch (error) {
        if (error instanceof ValidationError) {
            return response(res, error.statusCode, error.message, [], error.errorsList);
        }
        console.error("Unexpected error in createKey:", error);
        return response(res, 500, "Internal Server Error", [], [error.message]);
    }
};

export const getAPIKeys = async (req, res) => {
    try {
        const { condition } = req.params;
        
        let keys;

        switch (condition) {
        case "all":
            keys = await getAllApiKeys();
            break;

        case "active":
            keys = await getActiveApiKeys();
            break;

        case "inactive":
            keys = await getDeactiveApiKeys();
            break;

        default:
            return response(res, 400, "Invalid condition", [], [
            `Condition '${condition}' is not supported`,
            ]);
        }

        return response(res, 200, "API Keys retrieved successfully", keys);
    } catch (error) {
        return response(res, 500, "Internal Server Error", [], [error.message]);
    }
};


export const deleteAPIKey = async (req, res) => {
    try {
        const { apiKey } = req.params;
        await deactivateApiKey(apiKey);
        return response(res, 200, "API Key deleted successfully");
    } catch (error) {
        return response(res, 500, "Internal Server Error", [], [error.message]);
    }
};