import mysql from 'mysql2'
import { SeverConfig } from '@/model/SeverConfig'

const { MySqlConfig, configName } = SeverConfig


// 连接数据库
const connection = mysql.createConnection(MySqlConfig[configName])


// export default (() => (connection))
export default (() => (connection))