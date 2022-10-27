<template>
    <div class="container mt-custom">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT CONTACT</h4>
                        <hr>
                        <div v-if="validation.errors" class="mt-2 alert alert-danger">
                            <ul class="mt-0 mb-0">
                                <li v-for="(error, index) in validation.errors" :key="index">{{ `${error.param} : ${error.msg}` }}</li>
                            </ul>
                        </div>
                        <form @submit.prevent="update">
                            <div class="form-group">
                                <label for="nama" class="font-weight-bold mb-2">NAMA</label>
                                <input type="text" class="form-control" v-model="contact.nama" placeholder="Masukkan Nama Contact">
                            </div>
                            <div class="form-group mt-3">
                                <label for="noHp" class="font-weight-bold mb-2">NO HP</label>
                                <input class="form-control" rows="4" v-model="contact.noHp" placeholder="Masukkan Nomor HP">
                            </div>
                            <div class="form-group">
                                <label for="email" class="font-weight-bold mb-2">EMAIL</label>
                                <input type="text" class="form-control" v-model="contact.email" placeholder="Masukkan Email">
                            </div>
                            <div class="form-group">
                                <label for="alamat" class="font-weight-bold mb-2">ALAMAT</label>
                                <input type="text" class="form-control" v-model="contact.alamat" placeholder="Masukkan Nama Alamat">
                            </div>
                            <div class="form-group">
                                <label for="foto" class="font-weight-bold mb-2">FOTO</label>
                                <input type="text" class="form-control" v-model="contact.foto" placeholder="Masukkan Foto">
                            </div>
                            <button type="submit" class="btn btn-primary mt-3">UPDATE</button>
                        </form>                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {

    setup() {

        //state contact
        const contact = reactive({
            nama: '',
            noHp: '',
            email: '',
            alamat: '',
            foto: '',

        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //vue router
        const route = useRoute()

        //mounted
        onMounted(() => {

            //get API from Backend
            axios.get(`http://localhost:3000/api/contacts/${route.params.id}`)
            .then(response => {
              
              //assign state contacts with response data
              contact.nama    = response.data.data.nama  
              contact.noHp  = response.data.data.noHp  
              contact.email  = response.data.data.email  
              contact.alamat  = response.data.data.alamat  
              contact.foto  = response.data.data.foto  

            }).catch(error => {
                console.log(error.response.data)
            })

        })

        //method update
        function update() {

            let nama = contact.nama
            let noHp = contact.noHp
            let email = contact.email
            let alamat = contact.alamat
            let foto = contact.foto

            axios.patch(`http://localhost:3000/api/contacts/update/${route.params.id}`, {
                nama: nama,
                noHp: noHp,
                email: email,
                alamat: alamat,
                foto: foto,
            }).then(() => {

                //redirect ke contact index
                router.push({
                    name: 'contacts.index'
                })

            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })

        }

        //return
        return {
            contact,
            validation,
            router,
            update
        }

    }

}
</script>