import mysql from 'mysql'
import { SeverConfig } from '@/model/SeverConfig'

const { MySqlConfig, configName } = SeverConfig

// 连接数据库
const connection = mysql.createConnection(MySqlConfig)

export default (() => (connection))