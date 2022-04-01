const sqlite3 = require('sqlite3').verbose();

class Notes {
    constructor(file) {
        this.db = new sqlite3.Database(file);
        this.createTable()
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS notes (
                id integer PRIMARY KEY,
                title string,
                section string,
                text text,
                tags string,
                views number,
                likes number
            )`
        return this.db.run(sql)
    }

    addNote(note, callback) {
        return this.db.run(
            `INSERT INTO notes (title, section, text, tags, views, likes) 
                VALUES (?, ?, ?, ?, ?, ?)`,
            note, (err) => {
                callback(err)
            }
        )
    }

    showAll(callback) {
        return this.db.all(`SELECT * FROM notes`, function(err, data) {
            callback(err, data)
        })
    }

    findById(id, callback) {
        return this.db.get(`SELECT * FROM notes WHERE id = ?`,
            [id], (err, data) =>{
                callback(err, data)
            })
    }

    deleteById(id, callback) {
        return this.db.run(`DELETE FROM notes WHERE id = ?`,
            [id], (err) => {
                callback(err)
            })
    }

    updateById(update, callback) {
        return this.db.run(`
            UPDATE notes
            SET  title = ?,
                section = ?,
                text = ?,
                tags = ?
            WHERE id = ?
        `, update, (err) => {
            callback(err)
        })
    }

    updateViews(id, callback) {
        return this.db.run(`
            UPDATE notes
            SET views = views + 1
            WHERE id = ?
        `, id, (err) => {
            callback(err)
        })
    }
}


module.exports = Notes
