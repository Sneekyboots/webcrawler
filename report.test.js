const {sortpages}=require('./report.js')
const {test,expect}=require('@jest/globals')



test('sortpages',()=>
{
    
    const input={
        'https://wagslane.dev/path':1,
        'https://wagslane.dev':3
    }
    const actual= sortpages(input)
    const expected=[
        ['https://wagslane.dev',3],
        ['https://wagslane.dev/path',1]
    ]
    expect(actual).toEqual(expected)
})
test('sortpages 5 pages',()=>
{
    
    const input={
        'https://wagslane.dev/path1':1,
        'https://wagslane.dev':2,
        'https://wagslane.dev/path2':3,
        'https://wagslane.dev/path3':4,
        'https://wagslane.dev/path4':5,
    }
    const actual= sortpages(input)
    const expected=[
        ['https://wagslane.dev/path4',5],
        ['https://wagslane.dev/path3',4],
        ['https://wagslane.dev/path2',3],
        ['https://wagslane.dev',2],
        ['https://wagslane.dev/path1',1],
    ]
    expect(actual).toEqual(expected)
})