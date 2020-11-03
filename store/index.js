import Vuex from 'vuex';
import Cookies from 'js-cookie';
import moment from 'moment';
import axios from 'axios';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null,
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          (post) => post.id === editedPost.id
        );
        state.loadedPosts[postIndex] = editedPost;
      },
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      },
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios
          .get('https://nuxt-blog-4711b.firebaseio.com/posts.json')
          .then((res) => {
            const postsArr = [];
            for (const key in res.data) {
              postsArr.push({ ...res.data[key], id: key });
            }
            vuexContext.commit('setPosts', postsArr);
          })
          .catch((e) => context.error(e));
      },
      addPost(vuexContext, postData) {
        const createdPost = {
          ...postData,
          updatedDate: moment().format('LL'),
        };
        return axios
          .post(
            'https://nuxt-blog-4711b.firebaseio.com/posts.json?auth=' +
              vuexContext.state.token,
            createdPost
          )
          .then((result) => {
            vuexContext.commit('addPost', {
              ...createdPost,
              id: result.data.name,
            });
          })
          .catch((e) => console.log(e));
      },
      editPost(vuexContext, editedPost) {
        return axios
          .put(
            'https://nuxt-blog-4711b.firebaseio.com/posts/' +
              editedPost.id +
              '.json?auth=' +
              vuexContext.state.token,
            editedPost
          )
          .then((res) => {
            vuexContext.commit('editPost', editedPost);
          })
          .catch((e) => console.log(e));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts);
      },
      authenticateUser(vuexContext, authData) {
        let authURL =
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          process.env.fbAPIKey;
        if (!authData.isLogin) {
          authURL =
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
            process.env.fbAPIKey;
        }
        return this.$axios
          .$post(authURL, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          })
          .then((result) => {
            vuexContext.commit('setToken', result.idToken);
            Cookies.set('jwt', result.idToken);
            Cookies.set(
              'expirationTime',
              new Date().getTime() +
                Number.parseInt(result.expiresIn) *
                  1000000000000000000000000000000
            );
            localStorage.setItem('token', result.idToken);
            localStorage.setItem(
              'tokenExpiration',
              new Date().getTime() +
                Number.parseInt(result.expiresIn) *
                  1000000000000000000000000000000
            );
            return this.$axios.$post('https://localhost:3000/api/track-data', {
              data: 'Authenticated',
            });
          })
          .catch((e) => console.log(e));
      },
      setLogoutTimer(vuexContext, duration) {
        setTimeout(() => {
          vuexContext.commit('clearToken');
        }, duration);
      },
      initAuth(vuexContext, req) {
        let token;
        let expirationTime;
        if (process.client) {
          token = localStorage.getItem('token');
          expirationTime = localStorage.getItem('tokenExpiration');
        } else if (req) {
          if (!req.headers.cookies) {
            return;
          }
          const jwtCookie = req.headers.cookies
            .split(';')
            .find((c) => c.trim().startsWith('jwt='));
          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split('=')[1];
          expirationTime = req.headers.cookies
            .split(';')
            .find((c) => c.trim().startsWith('expirationTime='))
            .split('=')[1];
        } else {
          token = null;
          expirationTime = null;
        }
        if (new Date().getTime > +expirationTime || !token) {
          vuexContext.dispatch('logout');
          return;
        }
        vuexContext.commit('setToken', token);
      },
      logout(vuexContext) {
        vuexContext.commit('clearToken');
        Cookies.remove('token');
        Cookies.remove('expirationTime');
        if (process.client) {
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiration');
        }
      },
    },

    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuthenticated(state) {
        return state.token != null;
      },
    },
  });
};
export default createStore;
