<template>
	<div>
		<v-container fluid class="pt-0 grid-list-xl">
			<section-tooltip :title="$t('message.overview')" :tooltip="$t('message.dashboardOverview')"></section-tooltip>
			<!-- Dash Cards -->
			<v-row class="border-rad-sm overflow-hidden">
				<stats-card-v2
					colClasses="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12"
					:heading="$t('message.totalEarnings')"
					:amount="2145"
				>
				<div class="pa-5">
					<line-chart-shadow
						:dataSet="totalEarnings"
						:lineTension="0.4"
						:dataLabels="labels"
						:width="370"
						:height="80"
						:borderWidth=3
						:enableGradient='false'
						:enableShadow='false'
						:borderColor="ChartConfig.color.primary">
					</line-chart-shadow>
				</div>
				</stats-card-v2>
				<stats-card-v2
					colClasses="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12"
					:heading="$t('message.newCustomers')"
					:amount="136"
				>
				<div class="pa-5">
					<line-chart-shadow
						:dataSet="newCustomers"
						:lineTension="0.4"
						:dataLabels="labels"
						:width="370"
						:height="80"
						:borderWidth=3
						:enableGradient='false'
						:enableShadow='false'
						:borderColor="ChartConfig.color.info"
						>
					</line-chart-shadow>
				</div>
				</stats-card-v2>
				<stats-card-v2
					colClasses="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
					:heading="$t('message.onlineRevenue')"
					:amount="2145"
				>
				<div class="pa-5">
					<line-chart-shadow
						:dataSet="onlineRevenue"
						:lineTension="0.4"
						:dataLabels="labels"
						:width="370"
						:height="80"
						:borderWidth=3
						:enableGradient='false'
						:enableShadow='false'
						:borderColor="ChartConfig.color.warning">
					</line-chart-shadow>
				</div>
				</stats-card-v2>
			</v-row>
			<!-- Sales -->
			<v-row>
				<app-card
					:heading="$t('message.sales')"
					colClasses="col-xl-8 col-lg-7 col-md-7 col-sm-6 col-12"
					customClasses="mb-0 sales-widget"
					:fullScreen="true"
					:reloadable="true"
					:closeable="true"
				>
					<sales class="mb-5" :height="330"></sales>	
					<v-row class="cart-wrap hidden-only pl-6">
						<v-col cols="4" class="d-custom-flex">
							<span class="mr-2"><i class="zmdi zmdi-shopping-cart-plus primary--text"></i></span>
							<p class="mb-0">
								<span class="d-block fs-14 fw-bold">2382</span>
								<span class="d-block fs-12 grey--text fw-normal">Sales</span>
							</p>
						</v-col>
						<v-col cols="4" class="d-custom-flex">
							<span class="mr-2"><i class="zmdi zmdi-eye success--text"></i></span>
							<p class="mb-0">
								<span class="d-block fs-14 fw-bold">53,255</span>
								<span class="d-block fs-12 grey--text fw-normal">Views</span>
							</p>
						</v-col>
						<v-col cols="4" class="d-custom-flex">
							<span class="mr-2"><i class="zmdi zmdi-equalizer error--text"></i></span>
							<p class="mb-0">
								<span class="d-block fs-14 fw-bold">$1,25,000</span>
								<span class="d-block fs-12 grey--text fw-normal">Earned</span>
							</p>
						</v-col>
					</v-row>				
				</app-card>
				<!-- Devices Share -->
				<app-card
					colClasses="col-xl-4 col-lg-5 col-md-5 col-sm-6 col-12"
					:heading="$t('message.devicesShare')"
					:fullScreen="true"
					:reloadable="true"
					:closeable="true"
					customClasses="device-share-widget"
				>
					<device-share></device-share>
				</app-card>
			</v-row>
			<!-- Social Feeds -->
			<v-row>
				<app-card
					colClasses="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12"
					customClasses="social-share-wrap"
				>	
					<social-feeds 
						socialIcon="zmdi zmdi-facebook"
						friends="89K"
						feeds="459"
						type="facebook"
					>
					</social-feeds>
				</app-card>					
				<app-card
					colClasses="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12"
					customClasses="social-share-wrap"
				>	
					<social-feeds 
						socialIcon="zmdi zmdi-twitter"
						friends="65K"
						feeds="350"
						type="twitter"
					>
					</social-feeds>
				</app-card>
				<app-card
					colClasses="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12"
					customClasses="social-share-wrap"
				>	
					<social-feeds 
						socialIcon="zmdi zmdi-linkedin"
						friends="35K"
						feeds="689"
						type="linkedin"
					>
					</social-feeds>
				</app-card>
				<app-card
					colClasses="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12"
					customClasses="social-share-wrap"
				>	
					<social-feeds 
						socialIcon="zmdi zmdi-google"
						friends="90K"
						feeds="1000"
						type="google"
					>
					</social-feeds>
				</app-card>
			</v-row>
			
		</v-container>
	</div>
</template>

<script>
// charts component
import LineChartShadow from "Components/Charts/LineChartShadow";
import Sales from "Components/Charts/SalesChartV2";

// // widgets
import SocialFeeds from "Components/Widgets/SocialFeeds";
import DeviceShare from "Components/Widgets/DeviceShare";
import { ChartConfig } from "Constants/chart-config";

export default {
  components: {
    LineChartShadow,
    Sales,
    SocialFeeds,
    DeviceShare
  },
  data() {
    return {
      blog: {
        id: 3,
        thumbnail: "/static/img/blog-3.jpg",
        title: "lorem ipsum is simply dummy text",
        body:
          "Consectetur adipisicing elit. Ullam expedita, necessitatibus sit exercitationem aut quo quos inventore similique nulla minima distinctio illo iste dignissimos vero nostrum, magni pariatur delectus natus.",
        date: "1-jun-2018"
      },
      ChartConfig,
      labels: ["A", "B", "C", "D", "E", "F", "J", "K", "L", "M", "N", "P"],
      totalEarnings: [30, 50, 25, 55, 44, 60, 30, 20, 40, 20, 40, 44],
      onlineRevenue: [30, 50, 25, 55, 44, 60, 30, 20, 40, 20, 40, 44],
      newCustomers: [30, 50, 25, 55, 44, 60, 30, 20, 40, 20, 40, 44]
    };
  }
};
</script>
