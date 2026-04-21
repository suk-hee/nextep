import fs from 'fs';
import path from 'path';
import os from 'os';
export class ConfigManager {
    constructor() {
        // 创建配置目录在用户目录下
        const configDir = path.join(os.homedir(), '.mcp-figma');
        const cacheDir = path.join(configDir, 'cache');
        this.configPath = path.join(configDir, 'config.json');
        this.config = {
            apiKey: undefined,
            cacheDirPath: cacheDir
        };
        // 确保目录存在
        if (!fs.existsSync(configDir)) {
            fs.mkdirSync(configDir, { recursive: true });
        }
        // 确保缓存目录存在
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
        }
        // 加载配置
        this.loadConfig();
    }
    loadConfig() {
        try {
            if (fs.existsSync(this.configPath)) {
                const fileContent = fs.readFileSync(this.configPath, 'utf-8');
                const loadedConfig = JSON.parse(fileContent);
                // Ensure cacheDirPath exists in loaded config
                if (!loadedConfig.cacheDirPath) {
                    loadedConfig.cacheDirPath = this.config.cacheDirPath;
                }
                this.config = loadedConfig;
            }
        }
        catch (error) {
            console.error('Failed to load config:', error);
            // 出错时使用默认配置
            this.config = {
                apiKey: undefined,
                cacheDirPath: path.join(os.homedir(), '.mcp-figma', 'cache')
            };
        }
    }
    saveConfig() {
        try {
            fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
        }
        catch (error) {
            console.error('Failed to save config:', error);
        }
    }
    getApiKey() {
        return this.config.apiKey;
    }
    setApiKey(apiKey) {
        this.config.apiKey = apiKey;
        this.saveConfig();
    }
    getCacheDir() {
        return this.config.cacheDirPath || path.join(os.homedir(), '.mcp-figma', 'cache');
    }
    saveToCache(fileName, data) {
        try {
            const cacheDir = this.getCacheDir();
            const filePath = path.join(cacheDir, fileName);
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            return filePath;
        }
        catch (error) {
            console.error('Failed to save to cache:', error);
            throw error;
        }
    }
}
