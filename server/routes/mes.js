const Spanner = require('./until')
const connection = require('../mysql')
var spanner = new Spanner(connection)
async function mes(ctx) {
    var mes = await spanner.query({
        tableName: 'mes'
    })
    ctx.body = {
        mes
    }
}
async function deleteMes(ctx) {
    try {
        var res = await spanner.delete({
            tableName: 'mes',
            rules: `where id=${ctx.request.body.id}`
        })
        ctx.body = res
    } catch (e) {
        ctx.body = e
    }
}
async function addDetailMes(ctx) {
    var {
        nickName,
        avatarUrl,
        toWho,
        content,
        writeTime
    } = ctx.request.body
    try {
        var res = await spanner.insert({
            tableName: "mes",
            fields: ['nickName', 'avatarUrl', 'toWho', 'content', 'writeTime'],
            values: [nickName, avatarUrl, toWho, content, writeTime]
        })
        ctx.body = res
    } catch (e) {
        ctx.body = e
    }

}
module.exports = [{
    method: "get",
    path: '/mp/mes',
    handler: mes
}, {
    method: "post",
    path: '/mp/deleteMes',
    handler: deleteMes
},{
    method: "post",
    path: '/mp/addDetailMes',
    handler: addDetailMes
}]