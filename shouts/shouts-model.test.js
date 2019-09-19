const Shouts = require('./shouts-model.js')
const db = require('../data/db-config.js')

describe('shouts model', () => {
    beforeEach(async () => {
        await db('shouts').truncate();
    })

    it('should set env to testing', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })

    describe('insert()', () => {
        
        it('should insert shouts into the db', async () => {
            await Shouts.insert({ message: 'shout 1!'})
            await Shouts.insert({ message: 'shout 2!'})
            

            let shouts = await db('shouts')
            expect(shouts).toHaveLength(2)
        })

        it('should insert given message', async () => {
            const [id] = await Shouts.insert({ message: 'shout test!'})

            let shout = await db('shouts').where({ id }).first();

            expect(shout.message).toBe('shout test!')
        })

    })

    describe('remove()', () => {
        
        it('should remove inserted shout', async () => {
            const [id] = await Shouts.insert({ message: 'remove shout!'})
            await Shouts.remove(id)

            let shouts = await db('shouts')
            expect(shouts).toHaveLength(0)
        })

        it('should remove the specific id', async () => {
            await Shouts.insert({ message: 'shout 1!'})
            await Shouts.insert({ message: 'shout 2!'})
            await Shouts.insert({ message: 'shout 3!'})
            await Shouts.insert({ message: 'shout 4!'})
            await Shouts.insert({ message: 'shout 5!'})
            await Shouts.insert({ message: 'shout 6!'})

            await Shouts.remove(4)

            let shout = await db('shouts').where({id: 4}).first();
            expect(shout).toBeFalsy()
        })
    })
    
    
})
