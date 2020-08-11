var config = {
    local: {
        mariaDB: {
            host: '211.252.87.65'
            ,port:9033
            ,user: 'agentDesktop_service'
            ,password: 'desk@dmin18'
            ,database: 'c_cloud'
            ,multipleStatements :true
            ,charset:'utf8'
        },
        mssql: {
            server: '172.27.2.130' // '10.30.11.2'
            // ,port: 1433
            ,user: 'dev_infomart '
            ,password: 'uDevinfomart@'
            ,database: 'InfoMart'
        }
    },
    development: {
        mariaDB: {
            host: 'localhost' //'211.251.236.208' // '10.30.11.91'
            ,port:3306
            ,user: 'agentDesktop_service'
            ,password: 'desk@dmin18'
            ,database: 'c_cloud'
            ,multipleStatements :true
            ,charset:'utf8'
        },
        mssql: {
            server: '10.30.16.130'
            ,port: 1433
            ,user: 'dev_infomart'
            ,password: 'uDevinfomart@'
            ,database: 'InfoMart'
        }
    },
    production: {
        mariaDB: {
            host: '10.30.2.11'
            ,port:3030
            ,user: 'ccloud'
            ,password: 'c10ud@111'
            ,database: 'ccloud'
            ,multipleStatements :true
            ,charset:'utf8mb4'
        },
        mssql: {
            server: '10.30.11.2'
            ,port: 1433
            ,user: 'gcli_info_r'
            ,password: 'uP@ssword2'
            ,database: 'InfoMart'
            ,encrypt: true
        }
    }
}

module.exports.get = function( env ) {
    return config[env] || config['default'];
}
