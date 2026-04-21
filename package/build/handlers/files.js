import { ConfigManager } from '../utils/config.js';
export class FilesHandler {
    constructor(api) {
        this.api = api;
        this.configManager = new ConfigManager();
    }
    async getFile(args) {
        const { fileKey, branch_data, ids, version, depth } = args;
        const params = {
            branch_data,
            version,
            depth
        };
        const result = await this.api.makeRequest(`/files/${fileKey}${this.api.buildQueryString(params)}`);
        // Save to cache and return file path
        try {
            const fileName = `file_${fileKey}_${Date.now()}.json`;
            const filePath = this.configManager.saveToCache(fileName, result);
            return {
                file_path: filePath,
                message: "File data saved to local cache. Use this file path to access the complete data."
            };
        }
        catch (error) {
            // If saving to cache fails, return original result
            console.error('Failed to save to cache, returning original result:', error);
            return result;
        }
    }
    async getFileNodes(args) {
        const { fileKey, node_ids, ...otherParams } = args;
        const params = {
            ...otherParams,
            ids: node_ids.join(',')
        };
        const result = await this.api.makeRequest(`/files/${fileKey}/nodes${this.api.buildQueryString(params)}`);
        // Save to cache and return file path
        try {
            const fileName = `file_nodes_${fileKey}_${Date.now()}.json`;
            const filePath = this.configManager.saveToCache(fileName, result);
            return {
                file_path: filePath,
                message: "File nodes data saved to local cache. Use this file path to access the complete data."
            };
        }
        catch (error) {
            // If saving to cache fails, return original result
            console.error('Failed to save to cache, returning original result:', error);
            return result;
        }
    }
    async getImage(args) {
        const { fileKey, ids, scale, format, svg_include_id, svg_simplify_stroke, use_absolute_bounds } = args;
        const params = {
            ids: ids.join(','),
            scale,
            format,
            svg_include_id,
            svg_simplify_stroke,
            use_absolute_bounds
        };
        return this.api.makeRequest(`/images/${fileKey}${this.api.buildQueryString(params)}`);
    }
    async getImageFills(args) {
        const { fileKey } = args;
        return this.api.makeRequest(`/files/${fileKey}/images`);
    }
    async getComments(args) {
        const { fileKey } = args;
        return this.api.makeRequest(`/files/${fileKey}/comments`);
    }
    async postComment(args) {
        const { fileKey, ...commentData } = args;
        return this.api.makeRequest(`/files/${fileKey}/comments`, 'POST', commentData);
    }
    async deleteComment(args) {
        const { fileKey, comment_id } = args;
        return this.api.makeRequest(`/files/${fileKey}/comments/${comment_id}`, 'DELETE');
    }
}
