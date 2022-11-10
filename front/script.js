// URL base (from API)
const urlBase = 'http://localhost:5000/';

// list repositories function
document.getElementById('txtURL').placeholder = 'aguarde...';
listRepositories();

async function listRepositories() {
  let repositories, listRepositories;
  
  await axios.get(urlBase)
      .then(response => {
       repositories = response.data;

       if (repositories.length === 0) {
         listRepositories = 'nenhum registro encontrado';
       } else {
         listRepositories = `<table>
                              <th>original URL</th>
                              <th>short URL</th>`;
         for (i in repositories) {
           listRepositories += `<tr>
                                  <td><a href="${repositories[i].originURL}" target="_blank">${repositories[i].originURL}</a></td>
                                  <td><a href="${repositories[i].shortURL}" target="_blank">${repositories[i].shortURL}</a></td>
                                  <td class="tdButton"><button class="remove" onclick="deleteURL(\'${repositories[i].hash}\')">excluir</button></td>
                                </tr>`;
         }
         listRepositories += '</table>';
       }
      })
      .catch(err => {
        console.log(err)
      });

  document.querySelector('.content').innerHTML = listRepositories;
  document.getElementById('txtURL').placeholder = 'link';
}

// insert function
async function insertURL() {
  const URL = document.getElementById('txtURL').value;

  if (URL == '') {
    alert('insira um link');
    document.getElementById('txtURL').focus();
  } else {
    document.getElementById('txtURL').placeholder = 'aguarde...';

    await axios.post(`${urlBase}shorten`, { originURL: URL })
    .then(response => { console.log(response) })
    .then(document.getElementById('txtURL').value = '')
    .catch(err => { console.log(err.response) });

    listRepositories();
  }
}

// delete function
async function deleteURL(id) {
  if (confirm('Excluir URL?')) {
    document.getElementById('txtURL').placeholder = 'aguarde...';
    await axios.delete(urlBase+id)
    .then(response => { console.log(response) })
    .catch(err => { console.log(err.response) });
  
    listRepositories();
  }
}
