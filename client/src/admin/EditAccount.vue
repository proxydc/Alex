<template>
  <div>
    <h1>Edit Account</h1>
    <h2>{{ errorlst }}</h2>
    <div class="register"> 
      <label for="lblogin">Login Name</label> 
      <input type="text" v-model="model.account.login_name" class="form-control" id="lblogin" disabled >
      <label for="lbdisplay">Display Name</label>     
      <input type="text" id="lbdisplay" v-model="model.account.display_name" placeholder="Enter Display Name" class="form-control" />
      <label for="lbpassword">Password</label>
      <input type="password" v-model="model.account.pass_word" placeholder="Enter Password" id="lbpassword" class="form-control" />
      <div class="example ex1">
        <h5>Select Role</h5>
        <label class="radio red">
          <input type="radio" v-model="model.account.role_id" value="1" name="group1" />
          <span>Admin</span>
        </label>
        <label class="radio blue">
          <input type="radio" v-model="model.account.role_id" value="2" name="group1" />
          <span>User</span>
        </label>
      </div>
      <button v-on:click="updateAccount">Update Account</button>
    </div>
  </div>
</template>

<script>
import urlacc from "../_helpers/urllist.js";
import axios from "axios";

export default {
  name: "EditAccount",
  data() {
    return {
      errorlst: '',
      model: {
        account: {
          id: { type: Number, required: true },
          login_name: { type: String, required: true },
          display_name: { type: String, required: true },
          pass_word: { type: String, required: true },
          role_id: { type: Number, required: true },
        }
      }

    };
  },
  mounted() {
    this.getAccountData(this.$route.params.id);
  },

  methods: {

    getAccountData(accountId) {
      const url = urlacc.getEditAccUrl(accountId);
      alert("url: " + url);
      axios.get(url).then(res => {
        console.log(res.data)
        this.model.account = res.data[0]

      }).catch(function (err) {
        if (err.response) {
          this.errorlst = err.response.data.errors;
        }

      });
    },

    async updateAccount() {
      try {
        const url = urlacc.getEditAccUrl(this.model.account.id);
        let result = await axios.put(url, {
          display_name: this.model.account.display_name,
          pass_word: this.model.account.pass_word,
          role_id: this.model.account.role_id,
        });
        console.warn(result);
        if (result.status == 200) {
          alert(result.data);
          this.$router.push({ name: 'admin' })
        }
      }
      catch (err) {
        this.errorlst = err.errors;
      }
    },
  },
};
</script>

<style scoped>

.example {
  margin: 20px;
}

.example input {
  display: none;
}

.example label {
  margin-right: 20px;
  display: inline-block;
  cursor: pointer;
}

.ex1 span {
  display: block;
  padding: 5px 10px 5px 25px;
  border: 2px solid #ddd;
  border-radius: 5px;
  position: relative;
  transition: all 0.25s linear;
}

.ex1 span:before {
  content: '';
  position: absolute;
  left: 5px;
  top: 50%;
  -webkit-transform: translatey(-50%);
  transform: translatey(-50%);
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #ddd;
  transition: all 0.25s linear;
}

.ex1 input:checked+span {
  background-color: #fff;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
}
.ex1 .red input:checked+span {
  color: red;
  border-color: red;
}

.ex1 .red input:checked+span:before {
  background-color: red;
}

.ex1 .blue input:checked+span {
  color: blue;
  border-color: blue;
}

.ex1 .blue input:checked+span:before {
  background-color: blue;
}
</style>