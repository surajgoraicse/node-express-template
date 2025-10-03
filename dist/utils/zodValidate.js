import logger from '@/config/logger.js';
export function zodValidate(schema, data) {
    const res = schema.safeParse(data);
    if (!res.success) {
        logger.error(`[ZOD VALIDATION ERROR]: ${res.error.format()}`);
        throw new Error(JSON.stringify(res.error.format()));
    }
    return res.data;
}
//# sourceMappingURL=zodValidate.js.map