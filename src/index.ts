import {Context, Schema} from 'koishi'

export const name = 'new-repeater'

export interface Config {
}

export const description = '复读机器人'
export const Config: Schema<Config> = Schema.object({
    content: Schema.string().description('复读内容：').required(),
    debug: Schema.boolean().description('是否启动调试模式').default(false),
    possibility: Schema.number().description('复读概率').default(100),
})

export function apply(ctx: Context, config: Config) {
    const logger = ctx.logger('new-repeater') // 创建logger用于输出Koishi日志
    var ifDebug = false;
    ifDebug = config["debug"];

    function debug(content: any) {
        if (ifDebug)
            logger.info(content);
    }

    const content = config["content"]
    debug(`复读机启动完毕，复读内容：${content}`);
    ctx.on('message', (session) => {
        debug(`收到消息：${session.content}`)
        if (session.content === content) {
            // 随机复读
            let random = Math.floor(Math.random() * 100);
            if (random > config["possibility"]) {
                debug(`懒得复读：${session.content}`);
            } else {
                debug(`正在复读：${session.content}`);
                session.send(content)
            }
        }
    })
}
