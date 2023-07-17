<template>
  <div class="footer">
    <div class="full-container">
      <div class="divider"></div>
      <div class="top-container">
        <div class="contact-container">
          <h2>Contactez-nous:</h2>
          <div class="link-box">
            <a
              class="links-contact-container"
              href="mailto:42projetsweb@gmail.com"
            >
              <img
                src="@/assets/email.png"
                alt="Email"
              >
            </a>
          </div>
        </div>
        <div class="logo-container">
          <img
            src="@/assets/matcha.png"
            alt="Logo"
          >
        </div>
        <div class="follow-container">
          <div class="follow-text-container">
            <h2>Suivez-nous:</h2>
          </div>
          <div class="follow-links-container link-box">
            <a
              class="links-follow-container"
              href="https://www.facebook.com/42Matcha"
            >
              <img
                src="@/assets/fb.png"
                alt="Facebook"
              >
            </a>
            <a
              class="links-follow-container"
              href="https://www.instagram.com/42matcha/"
            >
              <img
                src="@/assets/inst.png"
                alt="Instagram"
              >
            </a>
            <a
              class="links-follow-container"
              href="https://twitter.com/42Matcha"
            >
              <img
                src="@/assets/tw.png"
                alt="Twitter"
              >
            </a>
            <a
              class="links-follow-container"
              href="https://www.youtube.com/@42Matcha"
            >
              <img
                src="@/assets/yt.png"
                alt="Youtube"
              >
            </a>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="bottom-container">
        <q-item>
          <p>
            <a href="https://profile.intra.42.fr/users/bhamdi">Bhamdi</a>
            &amp;
            <a href="https://profile.intra.42.fr/users/mbouzaie">Mbouzae</a><br />Vous présentent<br />
            <a href="https://projects.intra.42.fr/projects/42cursus-matcha">MATCHA © 2023</a>
          </p>
        </q-item>
      </div>
      <img
        class="back-to-top"
        src="@/assets/back-to-top.png"
        alt="Back to top"
        @click="moveUp"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterView',
  mounted () {

  },

  methods: {
    moveUp () {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
* {
  font-weight: bold;
  align-items: center;
  text-align: center;
}

.footer {
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  padding-top: 40px;
}

.full-container {
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.top-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end !important;
  align-items: stretch;
  font-size: 18px;
}

.contact-container,
.logo-container,
.follow-container {
  flex: 1;
  width: 33.33%;
}

.contact-container {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
}

.links-contact-container img {
  height: 37px;
  margin-right: 50px;
  border-right: 50px;
}

.link-box {
  display: flex;
}

.logo-container {
  display: flex;
  justify-content: center;
  padding: 0 20px;
}

.logo-container img {
  max-width: 100%;
  height: auto;
}

.follow-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 18px;
  margin-left: auto;
}

.links-follow-container img {
  height: 40px;
}

.follow-text-container {
  display: flex;
}

.follow-links-container {
  display: flex;
  gap: 30px;
}

.bottom-container {
  display: flex;
  font-size: 26px;
  text-align: center;
  margin-bottom: 17px;
}

.divider {
  width: 100%;
  height: 1px;
  background: rgba(128, 128, 128, 0.467);
  margin-top: 17px;
  margin-bottom: 17px;
}

.back-to-top {
  position: fixed;
  cursor: pointer;
  right: 45px;
  bottom: 30px;
  height: 130px;
}
</style>
