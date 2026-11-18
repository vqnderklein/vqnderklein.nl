import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        sveltekit({
            adapter: adapter(),
            compilerOptions: {
                runes: ({ filename }) =>
                    filename.split(/[/\\]/).includes('node_modules')
                        ? undefined
                        : true
            }
        })
    ],
	server: {
	  host: '0.0.0.0',
	  port: 3000,
	  watch: {
		usePolling: true
	  },
	  proxy: {
		'/api': {
		  target: 'http://backend:4000',
		  changeOrigin: true
		}
	  }
	}
});