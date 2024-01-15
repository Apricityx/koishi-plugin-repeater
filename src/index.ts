import { Context, Schema } from 'koishi'

export const name = 'repeater'

export interface Config {}

export const Config: Schema<Config> = Schema.object({
  content: Schema.string().description('复读内容：').required(),
  debug: Schema.boolean().description('是否启动调试模式').default(false),
  possibility: Schema.number().description('复读概率').default(100),
})

export function apply(ctx: Context, config: Config) {
  const logger = ctx.logger('Repeater') // 创建logger用于输出Koishi日志
  var ifDebug = false;
  ifDebug = config["debug"];
  function debug(content:any){
    if (ifDebug)
    logger.info(content);
  }
  const content = config["content"]
  ctx.middleware((session, next) => {
    if (session.content === content) {
      // 随机复读
      let random = Math.floor(Math.random() * 100);
      if (random > config["possibility"]) {
        debug(`懒得复读：${session.content}`);
        return next()
      }
      else{
        debug(`正在复读：${session.content}`);
        return content
      }
    } else {
      return next()
    }
  })
}
