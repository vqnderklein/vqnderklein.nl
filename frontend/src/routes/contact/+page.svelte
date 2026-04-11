<h1>Contact</h1>
<p>
	Ervaart u problemen, heeft u vragen of heeft u suggesties voor ons? Stuur een email naar
	hallo@vqnderklein.nl of vul het contactformulier in. Als u het formulier verstuurt gaat u akkoord
	met ons <a href="privacy">privacy beleid</a>, wat inhoudt dat u accepteert dat uw gegevens worden
	verzameld via het formulier en naar de beheeders worden verstuurd en gelezen.
</p>
<form enctype="multipart/form-data">
	<section>
		<span>
			<label for="firstName">Voornaam</label>
			<input type="text" required name="firstName" id="firstName" />
		</span>
		<span>
			<label for="lastName">Achternaam</label>
			<input type="text" required name="lastName" id="lastName" />
		</span>
	</section>

	<section>
		<span>
			<label for="email">Email</label>
			<input type="email" required name="email" id="email" />
		</span>
		<span></span>
	</section>

	<section>
		<span>
			<label for="aanhef">Aanhef</label>
			<select required name="aanhef" id="aanhef">
				<option value="" disabled selected hidden>Selecteer een optie</option>
				<option value="Dhr.">Dhr.</option>
				<option value="Mvr.">Mvr.</option>
				<option value="X">X</option>
			</select>
		</span>
		<span></span>
	</section>

	<section>
		<span>
			<label for="subject">Onderwerp</label>
			<input required type="text" name="subject" id="subject" />
		</span>
	</section>

	<section>
		<span>
			<label for="message">Bericht</label>
			<textarea required name="message" id="message" rows="10"></textarea>
		</span>
	</section>

	<section>
		<span class="pricacy">
			<label for="privacy"
				>Ik accepteer de <a href="privacy" target="_blank">privacy voorwaarden</a>.</label
			>
			<input type="checkbox" required name="privacy" id="privacy" />
		</span>
	</section>

	<input type="submit" value="Verstuur" />
</form>

<style>
	form {
		max-width: 60%;
		border: 1px solid var(--lightGrey);
		margin: 0 1rem;
		padding: 1rem;
		border-radius: 8px;
	}

	form section {
		display: flex;
		margin-bottom: 1rem;
		gap: 1rem;
	}

	form section > span {
		width: 100%;
	}

	form section > span label {
		display: block;
		padding-bottom: 6px;
		font-weight: 300;
	}

	form section > span input {
		padding: 8px 12px;
		width: 100%;
		outline: transparent;
	}

	form section > span input:focus {
		border: 2px solid #00a6a6;
		outline: transparent;
	}

	form section > span select {
		width: 100%;
		padding: 8px 0 8px 4px;
		border: 2px solid #00a6a6;
		outline: transparent;
		border-radius: 5px;
	}

	#message {
		width: 100%;
		resize: none;
		padding: 8px;
		outline: transparent;
	}

	#message:focus {
		border: 2px solid #00a6a6;
	}

	input[type='submit'] {
		padding: 8px 24px;
		border-radius: 5px;
		cursor: pointer;
		color: black;
		outline: transparent;
		width: max-content;
		background-color: #00a6a6;
		border: 1px solid var(--lightGrey);
	}

	input[type='checkbox'] {
		width: max-content;
		margin-right: 3px;
	}

	@media screen and (max-width: 1500px) {
		form {
			max-width: 100%;
		}
	}
</style>
