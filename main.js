import socksProxyAgentPkg from 'socks-proxy-agent'
import {Telegraf} from 'telegraf'

const {SocksProxyAgent} = socksProxyAgentPkg

/**
 * Created on 1400/1/30 (2021/4/19).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

const bot = new Telegraf(process.env.BOT_TOKEN, process.env.SOCKS_PROXY_HOST && {
	telegram: {
		agent: new SocksProxyAgent({
			host: process.env.SOCKS_PROXY_HOST,
			port: process.env.SOCKS_PROXY_PORT,
		}),
	},
})

bot.use(console.log)

// Launch bot
bot.launch().then()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
