<script>
	export default {
		data() {
			return {
				searchInput: '',
			};
		},
	};
</script>

<template>
	<div class="flex-shrink-0 p-3" style="width: 280px">
		<ul class="list-unstyled ps-0">
			<li class="mb-1">
				Gender
				<button
					class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
					data-bs-toggle="collapse"
					data-bs-target="#home-collapse"
					aria-expanded="true"
				></button>
				<div class="collapse show" id="home-collapse">
					<ul
						class="btn-toggle-nav list-unstyled fw-normal pb-1 small mt-4"
					>
						<li>
							<div class="form-check">
								<input
									class="form-check-input"
									type="radio"
									name="flexRadioDefault"
									id="flexRadioDefault1"
									checked
								/>
								<label
									class="form-check-label"
									for="flexRadioDefault1"
								>
									WOMEN
								</label>
							</div>
						</li>
						<li>
							<div class="form-check">
								<input
									class="form-check-input"
									type="radio"
									name="flexRadioDefault"
									id="flexRadioDefault2"
								/>
								<label
									class="form-check-label"
									for="flexRadioDefault2"
								>
									MEN
								</label>
							</div>
						</li>
					</ul>
				</div>
			</li>

			<li class="border-top my-3"></li>
			<li class="mb-1">
				Brand
				<button
					class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
					data-bs-toggle="collapse"
					data-bs-target="#dashboard-collapse"
					aria-expanded="false"
				></button>
				<div class="collapse" id="dashboard-collapse">
					<ul
						class="btn-toggle-nav list-unstyled fw-normal pb-1 small mt-4"
					>
						<li>
							<div class="input-group mb-3">
								<input
									type="text"
									class="form-control"
									placeholder="Search Brands"
									aria-label="Search Brands"
									aria-describedby="basic-addon1"
									v-model="searchInput"
								/>
							</div>
						</li>
						<li>
							<div class="form-check">
								<input
									class="form-check-input"
									type="checkbox"
									value=""
									id="flexCheckDefault"
								/>
								<label
									class="form-check-label"
									for="flexCheckDefault"
								>
									Unbranded
								</label>
							</div>
						</li>
					</ul>
				</div>
			</li>

			<li class="border-top my-3"></li>
			<li class="mb-1">
				Price
				<button
					class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
					data-bs-toggle="collapse"
					data-bs-target="#orders-collapse"
					aria-expanded="false"
				></button>
				<div class="collapse" id="orders-collapse">
					<div
						class="btn-toggle-nav list-unstyled fw-normal pb-1 small mt-4"
					>
						<div class="form-check">
							<input
								class="form-check-input"
								type="radio"
								name="flexRadioDefault"
								id="flexRadioDefault1"
							/>
							<label
								class="form-check-label"
								for="flexRadioDefault1"
							>
								SG $0 ~ SG $50
							</label>
						</div>
						<div class="form-check">
							<input
								class="form-check-input"
								type="radio"
								name="flexRadioDefault"
								id="flexRadioDefault1"
							/>
							<label
								class="form-check-label"
								for="flexRadioDefault1"
							>
								SG $50 ~ SG $100
							</label>
						</div>
						<div class="form-check">
							<input
								class="form-check-input"
								type="radio"
								name="flexRadioDefault"
								id="flexRadioDefault1"
							/>
							<label
								class="form-check-label"
								for="flexRadioDefault1"
							>
								SG $100 ~ SG $150
							</label>
						</div>
						<div class="form-check">
							<input
								class="form-check-input"
								type="radio"
								name="flexRadioDefault"
								id="flexRadioDefault1"
							/>
							<label
								class="form-check-label"
								for="flexRadioDefault1"
							>
								SG $150 ~ SG $200
							</label>
						</div>
						<div class="form-check">
							<input
								class="form-check-input"
								type="radio"
								name="flexRadioDefault"
								id="flexRadioDefault1"
							/>
							<label
								class="form-check-label"
								for="flexRadioDefault1"
							>
								SG $200 ~ SG $250
							</label>
						</div>
						<div class="form-check">
							<input
								class="form-check-input"
								type="radio"
								name="flexRadioDefault"
								id="flexRadioDefault1"
							/>
							<label
								class="form-check-label"
								for="flexRadioDefault1"
							>
								SG $250 ~ SG $300
							</label>
						</div>
						<div class="price-search">
							<div class="row">
								<div class="col-4">
									<input
										type="number"
										class="form-control"
										placeholder="0"
									/>
								</div>
								<div class="col-1">-</div>
								<div class="col-4">
									<input
										type="number"
										class="form-control"
										placeholder="0"
									/>
								</div>
								<div class="col-3">
									<button class="btn btn-outline-dark">
										Apply
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</li>
			<li class="border-top my-3"></li>
			<li class="mb-1">
				Account
				<button
					class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
					data-bs-toggle="collapse"
					data-bs-target="#account-collapse"
					aria-expanded="false"
				></button>
				<div class="collapse" id="account-collapse">
					<ul
						class="btn-toggle-nav list-unstyled fw-normal pb-1 small mt-4"
					>
						<li>
							<a
								href="#"
								class="link-body-emphasis d-inline-flex text-decoration-none rounded"
								>New...</a
							>
						</li>
						<li>
							<a
								href="#"
								class="link-body-emphasis d-inline-flex text-decoration-none rounded"
								>Profile</a
							>
						</li>
						<li>
							<a
								href="#"
								class="link-body-emphasis d-inline-flex text-decoration-none rounded"
								>Settings</a
							>
						</li>
						<li>
							<a
								href="#"
								class="link-body-emphasis d-inline-flex text-decoration-none rounded"
								>Sign out</a
							>
						</li>
					</ul>
				</div>
			</li>
		</ul>
	</div>
</template>
