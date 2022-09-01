module.exports = {
  apps : [{
    name   : "poshly environmental variables",
    script : "./index.js",
    watch: true,
    env:{
      "ACCESS_TOKEN_SECRET": "d5302d81e8db842d83398b4cb1655adb4d3ff9c0c516794f29f07c4518ea48253284f521c67d63f34056e350a4178672f5a1771735194b5dd3e4a7e100eec3e3",
      "NODE_ENV":"testing",
      "POSTGRESS_HOST":"moneypal-instance.crnptkgaqhpf.us-east-1.rds.amazonaws.com",
      "POSTGRESS_USER":"postgres",
      "POSTGRESS_PORT":"5432",
      "POSTGRESS_PASSWORD":"c1lQpP841EfCyhiUjvng",
      "POSTGRESS_DATABASE":"moneypal_db",
      "PLAID_CLIENT_ID":"62e6c83f2f4c380013dfb293",
      "PLAID_SECRET":"c47f84ef90103267bd55c306324211",
      "PLAID_ENV":"development",
      "PLAID_PRODUCTS":"auth,transactions",
      "PLAID_COUNTRY":"US,CA",
      "PLAID_REDIRECT_URI":"",
    }
  }]
}
