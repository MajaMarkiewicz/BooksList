let sampleBooks = [
    {
      "title": "Clean Architecture",
      "author": "Robert C. Martin",
      "releaseDate": "09/2017",
      "pages": 432,
      "link": "https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164"
    },
    {
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "releaseDate": "08/2008",
      "pages": 464,
      "link": "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882"
    },
    {
      "title": "Effective Java",
      "author": "Joshua Bloch",
      "releaseDate": "12/2017",
      "pages": 412,
      "link": "https://www.amazon.com/Effective-Java-Joshua-Bloch-dp-0134685997/dp/0134685997/ref=mt_paperback?_encoding=UTF8&me=&qid="
    },
    {
      "title": "Pragmatic Programmer",
      "author": "David Thomas & Andrew Hunt",
      "releaseDate": "10/1999",
      "pages": 352,
      "link": "https://www.amazon.com/Pragmatic-Programmer-Journeyman-Master/dp/020161622X"
    },
    {
      "title": "The Self-Taught Programmer",
      "author": "Cory Althoff",
      "releaseDate": "01/2017",
      "pages": 299,
      "link": "https://www.amazon.com/Self-Taught-Programmer-Definitive-Programming-Professionally-ebook/dp/B01M01YDQA"
    },
    {
      "title": "Practical Modern JavaScript",
      "author": "Nicolas Bevacqua",
      "releaseDate": "07/2017",
      "pages": 334,
      "link": "https://www.amazon.com/Practical-Modern-JavaScript-Dive-Future/dp/149194353X"
    }
]



describe('Books filter tests', ()=>{
  it('Empty array works fine and stays empty', ()=>{
    expect(filterBooks([], 0)).toEqual([]);
    expect(filterBooks([], 100)).toEqual([]);
    expect(filterBooks([], 200)).toEqual([]);
    expect(filterBooks([], 1000)).toEqual([]);
  })
  it('Single element is not passing when not enough pages', ()=>{
    let array = [{
      "pages": 172
    }]
    let result = filterBooks(array, 200)
    expect(result).toEqual([]);
  })
  it('Single element is passing when enough pages', ()=>{
    let array = [{
      "pages": 172
    }]
    let result = filterBooks(array, 100)
    expect(result).toEqual(array);
  })
  it('Complex test', ()=>{
    let array = sampleBooks.slice(0)
    let result = filterBooks(array, 0)
    expect(result).toEqual(array)
    result = filterBooks(array,200)
    expect(result).toEqual(array)
    result = filterBooks(array,300)
    expect(result.length).toEqual(5)
    result = filterBooks(array,400)
    expect(result.length).toEqual(3)
    result = filterBooks(array,1000)
    expect(result.length).toEqual(0)
  })
  it('Filter do not modify argument array', ()=>{
    let array = sampleBooks.slice(0)
    let res1 = filterBooks(array, 0)
    expect(array).toEqual(sampleBooks)
    expect(res1).not.toBe(array)
    let res2 = filterBooks(array, 400)
    expect(array).toEqual(sampleBooks)
    expect(res2).not.toBe(array)
  })
})

describe('Books sort tests', ()=>{
  it('Empty array works fine and stays empty', ()=>{
    expect(sortBooks([], "byPages")).toEqual([]);
    expect(sortBooks([], "byAuthor")).toEqual([]);
    expect(sortBooks([], "byReleaseDate")).toEqual([]);
    expect(sortBooks([], null)).toEqual([]);
  })
  it('Array with one element works fine and stays the same', ()=>{
    let array = [{
      "title": "The Self-Taught Programmer",
      "author": "Cory Althoff",
      "releaseDate": "01/2017",
      "pages": 299,
      "link": "https://www.amazon.com/Self-Taught-Programmer-Definitive-Programming-Professionally-ebook/dp/B01M01YDQA"
    }]
    expect(sortBooks(array, "byPages")).toEqual(array);
    expect(sortBooks(array, "byAuthor")).toEqual(array);
    expect(sortBooks(array, "byReleaseDate")).toEqual(array);
    expect(sortBooks(array, null)).toEqual(array);
  })
  it('Array with 2 elements is sorting according to the key', ()=>{
    let array = [
      {
        "title": "Clean Architecture",
        "author": "Robert C. Martin",
        "releaseDate": "09/2017",
        "pages": 432,
        "link": "https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164"
      },
      {
        "title": "The Self-Taught Programmer",
        "author": "Cory Althoff",
        "releaseDate": "01/2017",
        "pages": 299,
        "link": "https://www.amazon.com/Self-Taught-Programmer-Definitive-Programming-Professionally-ebook/dp/B01M01YDQA"
      }
    ]
    let sortedArray = [
      {
        "title": "The Self-Taught Programmer",
        "author": "Cory Althoff",
        "releaseDate": "01/2017",
        "pages": 299,
        "link": "https://www.amazon.com/Self-Taught-Programmer-Definitive-Programming-Professionally-ebook/dp/B01M01YDQA"
      },
      {
        "title": "Clean Architecture",
        "author": "Robert C. Martin",
        "releaseDate": "09/2017",
        "pages": 432,
        "link": "https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164"
      }
    ]
    expect(sortBooks(array, "byPages")).toEqual(sortedArray);
    expect(sortBooks(array, "byAuthor")).toEqual(sortedArray);
    expect(sortBooks(array, "byReleaseDate")).toEqual(sortedArray);
    expect(sortBooks(array, null)).toEqual(array);
  })
  it('byPages complex test', ()=>{
    let array = sampleBooks.slice(0)
    let result = sortBooks(array, "byPages")
    let expected = [
      {
        "title": "The Self-Taught Programmer",
        "author": "Cory Althoff",
        "releaseDate": "01/2017",
        "pages": 299,
        "link": "https://www.amazon.com/Self-Taught-Programmer-Definitive-Programming-Professionally-ebook/dp/B01M01YDQA"
      },
      {
        "title": "Practical Modern JavaScript",
        "author": "Nicolas Bevacqua",
        "releaseDate": "07/2017",
        "pages": 334,
        "link": "https://www.amazon.com/Practical-Modern-JavaScript-Dive-Future/dp/149194353X"
      },
      {
        "title": "Pragmatic Programmer",
        "author": "David Thomas & Andrew Hunt",
        "releaseDate": "10/1999",
        "pages": 352,
        "link": "https://www.amazon.com/Pragmatic-Programmer-Journeyman-Master/dp/020161622X"
      },
      {
        "title": "Effective Java",
        "author": "Joshua Bloch",
        "releaseDate": "12/2017",
        "pages": 412,
        "link": "https://www.amazon.com/Effective-Java-Joshua-Bloch-dp-0134685997/dp/0134685997/ref=mt_paperback?_encoding=UTF8&me=&qid="
      },
      {
        "title": "Clean Architecture",
        "author": "Robert C. Martin",
        "releaseDate": "09/2017",
        "pages": 432,
        "link": "https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164"
      },
      {
        "title": "Clean Code",
        "author": "Robert C. Martin",
        "releaseDate": "08/2008",
        "pages": 464,
        "link": "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882"
      },
    ]
    expect(result).toEqual(expected)
  })
  it('byAuthor complex test', ()=>{
    let array = sampleBooks.slice(0)
    let result = sortBooks(array, "byAuthor")
    let expected = [
      {
        "title": "The Self-Taught Programmer",
        "author": "Cory Althoff",
        "releaseDate": "01/2017",
        "pages": 299,
        "link": "https://www.amazon.com/Self-Taught-Programmer-Definitive-Programming-Professionally-ebook/dp/B01M01YDQA"
      },
      {
        "title": "Practical Modern JavaScript",
        "author": "Nicolas Bevacqua",
        "releaseDate": "07/2017",
        "pages": 334,
        "link": "https://www.amazon.com/Practical-Modern-JavaScript-Dive-Future/dp/149194353X"
      },
      {
        "title": "Effective Java",
        "author": "Joshua Bloch",
        "releaseDate": "12/2017",
        "pages": 412,
        "link": "https://www.amazon.com/Effective-Java-Joshua-Bloch-dp-0134685997/dp/0134685997/ref=mt_paperback?_encoding=UTF8&me=&qid="
      },
      {
        "title": "Pragmatic Programmer",
        "author": "David Thomas & Andrew Hunt",
        "releaseDate": "10/1999",
        "pages": 352,
        "link": "https://www.amazon.com/Pragmatic-Programmer-Journeyman-Master/dp/020161622X"
      },
      {
        "title": "Clean Architecture",
        "author": "Robert C. Martin",
        "releaseDate": "09/2017",
        "pages": 432,
        "link": "https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164"
      },
      {
        "title": "Clean Code",
        "author": "Robert C. Martin",
        "releaseDate": "08/2008",
        "pages": 464,
        "link": "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882"
      }
    ]
    expect(result).toEqual(expected)
  })
  it('byReleaseDate complex test', ()=>{
    let array = sampleBooks.slice(0)
    let result = sortBooks(array, "byReleaseDate")
    let expected = [
      {
        "title": "Pragmatic Programmer",
        "author": "David Thomas & Andrew Hunt",
        "releaseDate": "10/1999",
        "pages": 352,
        "link": "https://www.amazon.com/Pragmatic-Programmer-Journeyman-Master/dp/020161622X"
      },
      {
        "title": "Clean Code",
        "author": "Robert C. Martin",
        "releaseDate": "08/2008",
        "pages": 464,
        "link": "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882"
      },
      {
        "title": "The Self-Taught Programmer",
        "author": "Cory Althoff",
        "releaseDate": "01/2017",
        "pages": 299,
        "link": "https://www.amazon.com/Self-Taught-Programmer-Definitive-Programming-Professionally-ebook/dp/B01M01YDQA"
      },
      {
        "title": "Practical Modern JavaScript",
        "author": "Nicolas Bevacqua",
        "releaseDate": "07/2017",
        "pages": 334,
        "link": "https://www.amazon.com/Practical-Modern-JavaScript-Dive-Future/dp/149194353X"
      },
      {
        "title": "Clean Architecture",
        "author": "Robert C. Martin",
        "releaseDate": "09/2017",
        "pages": 432,
        "link": "https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164"
      },
      {
        "title": "Effective Java",
        "author": "Joshua Bloch",
        "releaseDate": "12/2017",
        "pages": 412,
        "link": "https://www.amazon.com/Effective-Java-Joshua-Bloch-dp-0134685997/dp/0134685997/ref=mt_paperback?_encoding=UTF8&me=&qid="
      }
    ]
    expect(result).toEqual(expected)
  })
  it('Sorting do not modify argument array', ()=>{
    let array = sampleBooks.slice(0)
    let res1 = sortBooks(array, "byPages")
    expect(array).toEqual(sampleBooks)
    expect(res1).not.toBe(array)
    let res2 = sortBooks(array, "byAuthor")
    expect(array).toEqual(sampleBooks)
    expect(res2).not.toBe(array)
    let res3 = sortBooks(array, "byReleaseDate")
    expect(array).toEqual(sampleBooks)
    expect(res3).not.toBe(array)
  })
})

describe('Books processing tests', ()=>{ // TO DO
  it('complex test for sorting by Release date and filtering from 400 pages', ()=>{
    let array = sampleBooks.slice(0)
    let result = processBooks(array, 400, "byReleaseDate")
    let expected = [
      {
        "title": "Clean Code",
        "author": "Robert C. Martin",
        "releaseDate": "08/2008",
        "pages": 464,
        "link": "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882"
      },
      {
        "title": "Clean Architecture",
        "author": "Robert C. Martin",
        "releaseDate": "09/2017",
        "pages": 432,
        "link": "https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164"
      },
      {
        "title": "Effective Java",
        "author": "Joshua Bloch",
        "releaseDate": "12/2017",
        "pages": 412,
        "link": "https://www.amazon.com/Effective-Java-Joshua-Bloch-dp-0134685997/dp/0134685997/ref=mt_paperback?_encoding=UTF8&me=&qid="
      }
    ]
    expect(result).toEqual(expected)
  })
  it('complex test for sorting by Author and filtering from 350 pages', ()=>{
    let array = sampleBooks.slice(0)
    let result = processBooks(array, 350, "byAuthor")
    let expected = [
      {
        "title": "Effective Java",
        "author": "Joshua Bloch",
        "releaseDate": "12/2017",
        "pages": 412,
        "link": "https://www.amazon.com/Effective-Java-Joshua-Bloch-dp-0134685997/dp/0134685997/ref=mt_paperback?_encoding=UTF8&me=&qid="
      },
      {
        "title": "Pragmatic Programmer",
        "author": "David Thomas & Andrew Hunt",
        "releaseDate": "10/1999",
        "pages": 352,
        "link": "https://www.amazon.com/Pragmatic-Programmer-Journeyman-Master/dp/020161622X"
      },
      {
        "title": "Clean Architecture",
        "author": "Robert C. Martin",
        "releaseDate": "09/2017",
        "pages": 432,
        "link": "https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164"
      },
      {
        "title": "Clean Code",
        "author": "Robert C. Martin",
        "releaseDate": "08/2008",
        "pages": 464,
        "link": "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882"
      }
    ]
    expect(result).toEqual(expected)
  })
})
