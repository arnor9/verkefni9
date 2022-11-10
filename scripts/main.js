/* eslint-disable guard-for-in */
import { searchBooks } from './lib/books.js';
import { el, empty } from './lib/helpers.js';
import { createSearchInput, createSearchResults } from './lib/ui.js';



const AUTHOR_API = 'https://openlibrary.org/search/authors.json'

function createAuthor() {
  
}

async function createAuthorsList(query, parent) {
  const list = document.createElement('ul');

  const url = new URL(`${AUTHOR_API}?q=${query}`);

  list.appendChild(list.appendChild(el('li', {}, 'Sæki gögn...')))

  parent.appendChild(list);

  let data = null
  console.log(url);
  try {
    const response = await fetch(url);
    console.log(response);

    // data á að vera niðurstaða (JSON) frá API
    data = await response.json(); 
  } catch (err) {
    console.error('Villa!', err);
  }

  empty(list);

  if (data) {
    if (data.docs.length === 0) {
      list.appendChild(list.appendChild(el('li', {}, 'Ekkert fannst')))
    }
    
    for (const doc of data.docs) {
      list.appendChild(list.appendChild(el('li', {}, doc.name)))
    }
  } else {
    list.appendChild(list.appendChild(el('li', {}, 'Villa við að sækja gögn')))
  }
  return list;
}
async function onSearch(e) {
  // console.log("blah");
  // let { value } = e.target.querySelector('input');
  // console.log(value);
  const mainElement = document.querySelector('main');
  await createAuthorsList('Stephen', mainElement);

  //console.log(result);
}

const searchForm = createSearchInput(onSearch);
const header = document.querySelector('.layout__header')
header.appendChild(searchForm);



async function main(query) {
  const mainElement = document.querySelector('main');

  //await createAuthorsList(query, mainElement);
}

main('Stephen');
