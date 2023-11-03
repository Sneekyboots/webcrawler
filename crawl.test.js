const {normalizeURL,geturlsfromHtml}=require('./crawl.js')
const {test,expect}=require('@jest/globals')



test('normalizeUrl strip protocol',()=>
{
    const input='https://blog.boot.dev/path'
    const actual= normalizeURL(input)
    const expected='blog.boot.dev/path'
    expect(actual).toEqual(expected)
})
test('normalizeUrl trailing slash',()=>
{
    const input='https://blog.boot.dev/path/'
    const actual= normalizeURL(input)
    const expected='blog.boot.dev/path'
    expect(actual).toEqual(expected)
})
test('normalizeUrl capitals ',()=>
{
    const input='https://BLOG.boot.dev/path'
    const actual= normalizeURL(input)
    const expected='blog.boot.dev/path'
    expect(actual).toEqual(expected)
})
test('normalizeUrl string http ',()=>
{
    const input='http://blog.boot.dev/path'
    const actual= normalizeURL(input)
    const expected='blog.boot.dev/path'
    expect(actual).toEqual(expected)
})


test('geturlsfromHtml absolute', () => {
    const inputHTMLBody = `
      <html>
        <body>
          <a href="https://blog.boot.dev/path/">
            Boot.dev Blog
          </a>
        </body>
      </html>`;
    const inputBASEURL = 'https://blog.boot.dev/path/';
    const actual = geturlsfromHtml(inputHTMLBody, inputBASEURL);
    const expected = ['https://blog.boot.dev/path/'];
    expect(actual).toEqual(expected);
  });

  test('geturlsfromHtml relative', () => {
    const inputHTMLBody = `
      <html>
        <body>
          <a href="/path/">
            Boot.dev Blog
          </a>
        </body>
      </html>`;
    const inputBASEURL = 'https://blog.boot.dev';
    const actual = geturlsfromHtml(inputHTMLBody, inputBASEURL);
    const expected = ['https://blog.boot.dev/path/'];
    expect(actual).toEqual(expected);
  });

  test('geturlsfromHtml relative', () => {
    const inputHTMLBody = `
      <html>
        <body>
          <a href="https://blog.boot.dev/path/">
            Boot.dev Blog
          </a>
        </body>
      </html>`;
    const inputBASEURL = 'https://blog.boot.dev';
    const actual = geturlsfromHtml(inputHTMLBody, inputBASEURL);
    const expected = ['https://blog.boot.dev/path/'];
    expect(actual).toEqual(expected);
  });
  test('geturlsfromHtml both', () => {
    const inputHTMLBody = `
      <html>
        <body>
          <a href="https://blog.boot.dev/path1/">
            Boot.dev Blog path one 
          </a>
          <a href="/path2/">
            Boot.dev Blog path two
          </a>
        </body>
      </html>`;
    const inputBASEURL = 'https://blog.boot.dev';
    const actual = geturlsfromHtml(inputHTMLBody, inputBASEURL);
    const expected = ['https://blog.boot.dev/path1/','https://blog.boot.dev/path2/'];
    expect(actual).toEqual(expected);
  });
  
  test('geturlsfromHtml invalid', () => {
    const inputHTMLBody = `
      <html>
        <body>
          <a href="invalid">
          Invalid Link
          </a>
        </body>
      </html>`;
    const inputBASEURL = 'https://blog.boot.dev';
    const actual = geturlsfromHtml(inputHTMLBody, inputBASEURL);
    const expected = [];
    expect(actual).toEqual(expected);
  });