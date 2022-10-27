<template>
    <div class="container mt-custom">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>DATA CONTACT</h4>
                        <hr>
                        <router-link :to="{name: 'contacts.create'}" class="btn btn-md btn-success">TAMBAH CONTACT</router-link>

                        <!-- <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NAMA</th>
                                    <th scope="col">NO HP</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col">ALAMAT</th>
                                    <th scope="col">FOTO</th>
                                    <th scope="col">OPTIONS</th>
                                </tr>
                            </thead>
                        <tbody>
                            <tr v-for="(contact, index) in contacts" :key="index">
                                <td>{{ contact.nama }}</td>
                                <td>{{ contact.noHp }}</td>
                                <td>{{ contact.email }}</td>
                                <td>{{ contact.alamat }}</td>
                                <td>{{ contact.foto }}</td>
                                <td class="text-center">
                                    <router-link :to="{name: 'contacts.edit', params:{id: contact.id }}" class="btn btn-sm btn-primary me-2">EDIT</router-link>
                                    <button @click.prevent="contactDelete(contact.id)" class="btn btn-sm btn-danger ml-1">DELETE</button>
                                </td>
                            </tr>
                        </tbody>
                        </table> -->


                        <div class="row m-3">
                            <div v-for="(contact, index) in contacts" :key="index" class="card m-2" style="width: 18rem;">
                            <div class="col"> 
                                <div class="card-body">
                                    <h3 class="card-title">{{ contact.nama }}</h3>
                                    <h6 class="card-title">{{ contact.noHp }}</h6>
                                    <p class="card-title">{{ contact.email }}</p>
                                    <p class="card-title">{{ contact.alamat }}</p>
                                    <p class="card-title">{{ contact.foto }}</p>
                                    <div class="">
                                        <router-link :to="{name: 'contacts.edit', params:{id: contact.id }}" class="btn btn-sm btn-primary me-2">EDIT
                                        </router-link>
                                        <button @click.prevent="contactDelete(contact.id)" class="btn btn-sm btn-danger ml-1">DELETE</button>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {

    setup() {

        //reactive state
        let contacts = ref([])

        //mounted
        onMounted(() => {

           //panggil function "getDataContacts" 
           getDataContacts()

        })

        //function "getDataContacts"
        function getDataContacts() {

            //get API from Express Backend
            axios.get('http://localhost:3000/api/contacts')
            .then(response => {
              
              //assign state contacts with response data
              contacts.value = response.data.data

            }).catch(error => {
                console.log(error.response.data)
            })
        }


// function "contactDelete"
function contactDelete(id) {

  //delete data post by ID
  axios.delete(`http://localhost:3000/api/contacts/delete/${id}`)
  .then(() => {

     //panggil function "getDataContacts"  
     getDataContacts()

  }).catch(error => {
     console.log(error.response.data)
  })
}
    //return
        return {
            contacts,
            getDataContacts,
            contactDelete		// <-- function "contactDelete"
        }
    }
}
</script>