<script lang="ts">
	export let message: string;
</script>

{#if message}
	<p class="alert">{message}</p>
{/if}

<style>
	p.alert {
		padding: 6px 12px;
		margin: 1rem;
		margin-top: 0;
		border: 1px solid var(--accent1);
		width: max-content;
		border-radius: 5px;
		color: #e84855;
	}

	@media screen and (max-width: 450px) {
		p.alert {
			max-width: 100%;
			margin: 0;
			border-radius: 0;
		}
	}
</style>
