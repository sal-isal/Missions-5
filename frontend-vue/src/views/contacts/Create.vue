<template>
    <div class="container mt-custom">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH CONTACT</h4>
                        <hr>
                        <div v-if="validation.errors" class="mt-2 alert alert-danger">
                            <ul class="mt-0 mb-0">
                                <li v-for="(error, index) in validation.errors" :key="index">{{ `${error.param} : ${error.msg}` }}</li>
                            </ul>
                        </div>
                        <form @submit.prevent="store">
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
                                <input type="text" class="form-control" v-model="contact.alamat" placeholder="Masukkan Alamat">
                            </div>
                            <div class="form-group">
                                <label for="foto" class="font-weight-bold mb-2">FOTO</label>
                                <input type="text" class="form-control" v-model="contact.foto" placeholder="Masukkan Foto">
                            </div>
                            <button type="submit" class="btn btn-primary mt-3">SIMPAN</button>
                        </form>                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {

    setup() {

        //state contacts
        const contact = reactive({
            nama: '',
            noHp: '',
            email: '',
            alamat: '',
            foto: ''
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //method store
        function store() {

            let nama   = contact.nama
            let noHp = contact.noHp
            let email = contact.email
            let alamat = contact.alamat
            let foto = contact.foto

            axios.post('http://localhost:3000/api/contacts/store', {
                nama: nama,
                noHp: noHp,
                email: email,
                alamat: alamat,
                foto: foto

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
            store
        }

    }

}
</script>