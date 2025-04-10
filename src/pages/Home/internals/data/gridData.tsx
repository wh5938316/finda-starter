import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import type { GridCellParams, GridColDef, GridRowsProp } from '@mui/x-data-grid';

import { brand } from '@/theme/themePrimitives';

type SparkLineData = number[];

function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days = [];
  let index = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${index}`);
    index += 1;
  }
  return days;
}

function renderSparklineCell(parameters: GridCellParams<SparkLineData, any>) {
  const data = getDaysInMonth(4, 2024);
  const { value, colDef } = parameters;

  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <SparkLineChart
        data={value}
        width={colDef.computedWidth || 100}
        height={32}
        plotType="bar"
        showHighlight
        showTooltip
        colors={[brand[900]]}
        xAxis={{
          scaleType: 'band',
          data,
        }}
      />
    </div>
  );
}

function renderStatus(status: 'Online' | 'Offline') {
  const colors: Record<string, 'success' | 'default'> = {
    Online: 'success',
    Offline: 'default',
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

export function renderAvatar(
  parameters: GridCellParams<{ name: string; color: string }, any, any>,
) {
  if (parameters.value == undefined) {
    return '';
  }

  return (
    <Avatar
      sx={{
        backgroundColor: parameters.value.color,
        width: '24px',
        height: '24px',
        fontSize: '0.85rem',
      }}
    >
      {parameters.value.name.toUpperCase().slice(0, 1)}
    </Avatar>
  );
}

export const columns: GridColDef[] = [
  { field: 'pageTitle', headerName: 'Page Title', flex: 1.5, minWidth: 200 },
  {
    field: 'status',
    headerName: 'Status',
    flex: 0.5,
    minWidth: 80,
    renderCell: (parameters) => renderStatus(parameters.value),
  },
  {
    field: 'users',
    headerName: 'Users',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'eventCount',
    headerName: 'Event Count',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'viewsPerUser',
    headerName: 'Views per User',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'averageTime',
    headerName: 'Average Time',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'conversions',
    headerName: 'Daily Conversions',
    flex: 1,
    minWidth: 150,
    renderCell: renderSparklineCell,
  },
];

export const rows: GridRowsProp = [
  {
    id: 1,
    pageTitle: 'Homepage Overview',
    status: 'Online',
    eventCount: 8345,
    users: 212_423,
    viewsPerUser: 18.5,
    averageTime: '2m 15s',
    conversions: [
      469_172, 488_506, 592_287, 617_401, 640_374, 632_751, 668_638, 807_246, 749_198, 944_863,
      911_787, 844_815, 992_022, 1_143_838, 1_446_926, 1_267_886, 1_362_511, 1_348_746, 1_560_533,
      1_670_690, 1_695_142, 1_916_613, 1_823_306, 1_683_646, 2_025_965, 2_529_989, 3_263_473,
      3_296_541, 3_041_524, 2_599_497,
    ],
  },
  {
    id: 2,
    pageTitle: 'Product Details - Gadgets',
    status: 'Online',
    eventCount: 5653,
    users: 172_240,
    viewsPerUser: 9.7,
    averageTime: '2m 30s',
    conversions: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 557_488,
      1_341_471, 2_044_561, 2_206_438,
    ],
  },
  {
    id: 3,
    pageTitle: 'Checkout Process - Step 1',
    status: 'Offline',
    eventCount: 3455,
    users: 58_240,
    viewsPerUser: 15.2,
    averageTime: '2m 10s',
    conversions: [
      166_896, 190_041, 248_686, 226_746, 261_744, 271_890, 332_176, 381_123, 396_435, 495_620,
      520_278, 460_839, 704_158, 559_134, 681_089, 712_384, 765_381, 771_374, 851_314, 907_947,
      903_675, 1_049_642, 1_003_160, 881_573, 1_072_283, 1_139_115, 1_382_701, 1_395_655, 1_355_040,
      1_381_571,
    ],
  },
  {
    id: 4,
    pageTitle: 'User Profile Dashboard',
    status: 'Online',
    eventCount: 112_543,
    users: 96_240,
    viewsPerUser: 4.5,
    averageTime: '2m 40s',
    conversions: [
      264_651, 311_845, 436_558, 439_385, 520_413, 533_380, 562_363, 533_793, 558_029, 791_126,
      649_082, 566_792, 723_451, 737_827, 890_859, 935_554, 1_044_397, 1_022_973, 1_129_827,
      1_145_309, 1_195_630, 1_358_925, 1_373_160, 1_172_679, 1_340_106, 1_396_974, 1_623_641,
      1_687_545, 1_581_634, 1_550_291,
    ],
  },
  {
    id: 5,
    pageTitle: 'Article Listing - Tech News',
    status: 'Offline',
    eventCount: 3653,
    users: 142_240,
    viewsPerUser: 3.1,
    averageTime: '2m 55s',
    conversions: [
      251_871, 262_216, 402_383, 396_459, 378_793, 406_720, 447_538, 451_451, 457_111, 589_821,
      640_744, 504_879, 626_099, 662_007, 754_576, 768_231, 833_019, 851_537, 972_306, 1_014_831,
      1_027_570, 1_189_068, 1_119_099, 987_244, 1_197_954, 1_310_721, 1_480_816, 1_577_547,
      1_854_053, 1_791_831,
    ],
  },
  {
    id: 6,
    pageTitle: 'FAQs - Customer Support',
    status: 'Online',
    eventCount: 106_543,
    users: 15_240,
    viewsPerUser: 7.2,
    averageTime: '2m 20s',
    conversions: [
      13_671, 16_918, 27_272, 34_315, 42_212, 56_369, 64_241, 77_857, 70_680, 91_093, 108_306,
      94_734, 132_289, 133_860, 147_706, 158_504, 192_578, 207_173, 220_052, 233_496, 250_091,
      285_557, 268_555, 259_482, 274_019, 321_648, 359_801, 399_502, 447_249, 497_403,
    ],
  },
  {
    id: 7,
    pageTitle: 'Product Comparison - Laptops',
    status: 'Offline',
    eventCount: 7853,
    users: 32_240,
    viewsPerUser: 6.5,
    averageTime: '2m 50s',
    conversions: [
      93_682, 107_901, 144_919, 151_769, 170_804, 183_736, 201_752, 219_792, 227_887, 295_382,
      309_600, 278_050, 331_964, 356_826, 404_896, 428_090, 470_245, 485_582, 539_056, 582_112,
      594_289, 671_915, 649_510, 574_911, 713_843, 754_965, 853_020, 916_793, 960_158, 984_265,
    ],
  },
  {
    id: 8,
    pageTitle: 'Shopping Cart - Electronics',
    status: 'Online',
    eventCount: 8563,
    users: 48_240,
    viewsPerUser: 4.3,
    averageTime: '3m 10s',
    conversions: [
      52_394, 63_357, 82_800, 105_466, 128_729, 144_472, 172_148, 197_919, 212_302, 278_153,
      290_499, 249_824, 317_499, 333_024, 388_925, 410_576, 462_099, 488_477, 533_956, 572_307,
      591_019, 681_506, 653_332, 581_234, 719_038, 783_496, 911_609, 973_328, 1_056_071, 1_112_940,
    ],
  },
  {
    id: 9,
    pageTitle: 'Payment Confirmation - Bank Transfer',
    status: 'Offline',
    eventCount: 4563,
    users: 18_240,
    viewsPerUser: 2.7,
    averageTime: '3m 25s',
    conversions: [
      15_372, 16_901, 25_489, 30_148, 40_857, 51_136, 64_627, 75_804, 89_633, 100_407, 114_908,
      129_957, 143_568, 158_509, 174_822, 192_488, 211_512, 234_702, 258_812, 284_328, 310_431,
      338_186, 366_582, 396_749, 428_788, 462_880, 499_125, 537_723, 578_884, 622_825,
    ],
  },
  {
    id: 10,
    pageTitle: 'Product Reviews - Smartphones',
    status: 'Online',
    eventCount: 9863,
    users: 28_240,
    viewsPerUser: 5.1,
    averageTime: '3m 05s',
    conversions: [
      70_211, 89_234, 115_676, 136_021, 158_744, 174_682, 192_890, 218_073, 240_926, 308_190,
      317_552, 279_834, 334_072, 354_955, 422_153, 443_911, 501_486, 538_091, 593_724, 642_882,
      686_539, 788_615, 754_813, 687_955, 883_645, 978_347, 1_142_551, 1_233_074, 1_278_155,
      1_356_724,
    ],
  },
  {
    id: 11,
    pageTitle: 'Subscription Management - Services',
    status: 'Offline',
    eventCount: 6563,
    users: 24_240,
    viewsPerUser: 4.8,
    averageTime: '3m 15s',
    conversions: [
      49_662, 58_971, 78_547, 93_486, 108_722, 124_901, 146_422, 167_883, 189_295, 230_090, 249_837,
      217_828, 266_494, 287_537, 339_586, 363_299, 412_855, 440_900, 490_111, 536_729, 580_591,
      671_635, 655_812, 576_431, 741_632, 819_296, 971_762, 1_052_605, 1_099_234, 1_173_591,
    ],
  },
  {
    id: 12,
    pageTitle: 'Order Tracking - Shipments',
    status: 'Online',
    eventCount: 12_353,
    users: 38_240,
    viewsPerUser: 3.5,
    averageTime: '3m 20s',
    conversions: [
      29_589, 37_965, 55_800, 64_672, 77_995, 91_126, 108_203, 128_900, 148_232, 177_159, 193_489,
      164_471, 210_765, 229_977, 273_802, 299_381, 341_092, 371_567, 413_812, 457_693, 495_920,
      564_785, 541_022, 491_680, 618_096, 704_926, 833_365, 904_313, 974_622, 1_036_567,
    ],
  },
  {
    id: 13,
    pageTitle: 'Customer Feedback - Surveys',
    status: 'Offline',
    eventCount: 5863,
    users: 13_240,
    viewsPerUser: 2.3,
    averageTime: '3m 30s',
    conversions: [
      8472, 9637, 14_892, 19_276, 23_489, 28_510, 33_845, 39_602, 45_867, 52_605, 59_189, 65_731,
      76_021, 85_579, 96_876, 108_515, 119_572, 131_826, 145_328, 160_192, 176_528, 196_662,
      217_929, 239_731, 262_920, 289_258, 315_691, 342_199, 370_752, 402_319,
    ],
  },
  {
    id: 14,
    pageTitle: 'Account Settings - Preferences',
    status: 'Online',
    eventCount: 7853,
    users: 18_240,
    viewsPerUser: 3.2,
    averageTime: '3m 15s',
    conversions: [
      15_792, 16_948, 22_728, 25_491, 28_412, 31_268, 34_241, 37_857, 42_068, 46_893, 51_098,
      55_734, 60_780, 66_421, 72_680, 79_584, 87_233, 95_711, 105_285, 115_814, 127_509, 140_260,
      154_086, 169_495, 186_445, 205_109, 225_580, 247_983, 272_484, 299_280,
    ],
  },
  {
    id: 15,
    pageTitle: 'Login Page - Authentication',
    status: 'Offline',
    eventCount: 9563,
    users: 24_240,
    viewsPerUser: 2.5,
    averageTime: '3m 35s',
    conversions: [
      25_638, 28_355, 42_089, 53_021, 66_074, 80_620, 97_989, 118_202, 142_103, 166_890, 193_869,
      225_467, 264_089, 307_721, 358_059, 417_835, 488_732, 573_924, 674_878, 794_657, 938_542,
      1_111_291, 1_313_329, 1_543_835, 1_812_156, 2_123_349, 2_484_926, 2_907_023, 3_399_566,
      3_973_545,
    ],
  },
  {
    id: 16,
    pageTitle: 'Promotions - Seasonal Sales',
    status: 'Online',
    eventCount: 13_423,
    users: 54_230,
    viewsPerUser: 7.8,
    averageTime: '2m 45s',
    conversions: [
      241_732, 256_384, 289_465, 321_423, 345_672, 378_294, 398_472, 420_364, 436_278, 460_192,
      495_374, 510_283, 532_489, 559_672, 587_312, 610_982, 629_385, 654_732, 678_925, 704_362,
      725_182, 749_384, 772_361, 798_234, 819_472, 846_291, 872_183, 894_673, 919_283, 945_672,
    ],
  },
  {
    id: 17,
    pageTitle: 'Tutorials - How to Guides',
    status: 'Offline',
    eventCount: 4234,
    users: 19_342,
    viewsPerUser: 5.2,
    averageTime: '3m 05s',
    conversions: [
      12_345, 14_567, 16_789, 18_901, 21_023, 23_145, 25_267, 27_389, 29_501, 31_623, 33_745,
      35_867, 37_989, 40_101, 42_223, 44_345, 46_467, 48_589, 50_701, 52_823, 54_945, 57_067,
      59_189, 61_301, 63_423, 65_545, 67_667, 69_789, 71_901, 74_023,
    ],
  },
  {
    id: 18,
    pageTitle: 'Blog Posts - Tech Insights',
    status: 'Online',
    eventCount: 8567,
    users: 34_234,
    viewsPerUser: 6.3,
    averageTime: '2m 50s',
    conversions: [
      23_456, 25_678, 27_890, 30_102, 32_324, 34_546, 36_768, 38_980, 41_202, 43_424, 45_646,
      47_868, 50_080, 52_302, 54_524, 56_746, 58_968, 61_180, 63_402, 65_624, 67_846, 70_068,
      72_290, 74_502, 76_724, 78_946, 81_168, 83_380, 85_602, 87_824,
    ],
  },
  {
    id: 19,
    pageTitle: 'Events - Webinars',
    status: 'Offline',
    eventCount: 3456,
    users: 19_234,
    viewsPerUser: 4.5,
    averageTime: '3m 20s',
    conversions: [
      123_456, 145_678, 167_890, 190_012, 212_324, 234_546, 256_768, 278_980, 301_202, 323_424,
      345_646, 367_868, 390_080, 412_302, 434_524, 456_746, 478_968, 501_180, 523_402, 545_624,
      567_846, 590_068, 612_290, 634_502, 656_724, 678_946, 701_168, 723_380, 745_602, 767_824,
    ],
  },
  {
    id: 20,
    pageTitle: 'Support - Contact Us',
    status: 'Online',
    eventCount: 6734,
    users: 27_645,
    viewsPerUser: 3.9,
    averageTime: '2m 55s',
    conversions: [
      234_567, 256_789, 278_901, 301_023, 323_245, 345_467, 367_689, 389_801, 412_023, 434_245,
      456_467, 478_689, 500_801, 523_023, 545_245, 567_467, 589_689, 611_801, 634_023, 656_245,
      678_467, 700_689, 722_801, 745_023, 767_245, 789_467, 811_689, 833_801, 856_023, 878_245,
    ],
  },
  {
    id: 21,
    pageTitle: 'Case Studies - Success Stories',
    status: 'Offline',
    eventCount: 4567,
    users: 19_345,
    viewsPerUser: 6.1,
    averageTime: '3m 10s',
    conversions: [
      34_567, 36_789, 38_901, 41_023, 43_145, 45_267, 47_389, 49_501, 51_623, 53_745, 55_867,
      57_989, 60_101, 62_223, 64_345, 66_467, 68_589, 70_701, 72_823, 74_945, 77_067, 79_189,
      81_301, 83_423, 85_545, 87_667, 89_789, 91_901, 94_023, 96_145,
    ],
  },
  {
    id: 22,
    pageTitle: 'News - Industry Updates',
    status: 'Online',
    eventCount: 7856,
    users: 34_567,
    viewsPerUser: 5.7,
    averageTime: '3m 05s',
    conversions: [
      45_678, 47_890, 50_102, 52_324, 54_546, 56_768, 58_980, 61_202, 63_424, 65_646, 67_868,
      70_080, 72_302, 74_524, 76_746, 78_968, 81_180, 83_402, 85_624, 87_846, 90_068, 92_290,
      94_502, 96_724, 98_946, 101_168, 103_380, 105_602, 107_824, 110_046,
    ],
  },
  {
    id: 23,
    pageTitle: 'Forum - User Discussions',
    status: 'Offline',
    eventCount: 5678,
    users: 23_456,
    viewsPerUser: 4.2,
    averageTime: '2m 40s',
    conversions: [
      56_789, 58_901, 61_023, 63_145, 65_267, 67_389, 69_501, 71_623, 73_745, 75_867, 77_989,
      80_101, 82_223, 84_345, 86_467, 88_589, 90_701, 92_823, 94_945, 97_067, 99_189, 101_301,
      103_423, 105_545, 107_667, 109_789, 111_901, 114_023, 116_145, 118_267,
    ],
  },
  {
    id: 24,
    pageTitle: 'Documentation - API Reference',
    status: 'Online',
    eventCount: 6789,
    users: 27_689,
    viewsPerUser: 5,
    averageTime: '3m 00s',
    conversions: [
      67_890, 70_102, 72_324, 74_546, 76_768, 78_980, 81_202, 83_424, 85_646, 87_868, 90_080,
      92_302, 94_524, 96_746, 98_968, 101_180, 103_402, 105_624, 107_846, 110_068, 112_290, 114_502,
      116_724, 118_946, 121_168, 123_380, 125_602, 127_824, 130_046, 132_268,
    ],
  },
  {
    id: 25,
    pageTitle: 'Services - Consulting',
    status: 'Offline',
    eventCount: 4563,
    users: 19_240,
    viewsPerUser: 6.4,
    averageTime: '3m 25s',
    conversions: [
      345_678, 367_890, 390_012, 412_324, 434_546, 456_768, 478_980, 501_202, 523_424, 545_646,
      567_868, 590_080, 612_302, 634_524, 656_746, 678_968, 701_180, 723_402, 745_624, 767_846,
      790_068, 812_290, 834_502, 856_724, 878_946, 901_168, 923_380, 945_602, 967_824, 990_046,
    ],
  },
  {
    id: 26,
    pageTitle: 'Feedback - User Reviews',
    status: 'Online',
    eventCount: 8564,
    users: 34_240,
    viewsPerUser: 6.2,
    averageTime: '3m 15s',
    conversions: [
      123_478, 145_690, 167_912, 190_134, 212_356, 234_578, 256_790, 279_012, 301_234, 323_456,
      345_678, 367_890, 390_012, 412_234, 434_456, 456_678, 478_890, 501_012, 523_234, 545_456,
      567_678, 589_890, 612_012, 634_234, 656_456, 678_678, 700_890, 723_012, 745_234, 767_456,
    ],
  },
  {
    id: 27,
    pageTitle: 'Profiles - Team Members',
    status: 'Offline',
    eventCount: 5634,
    users: 23_423,
    viewsPerUser: 5.5,
    averageTime: '2m 45s',
    conversions: [
      345_123, 367_345, 389_567, 411_789, 434_012, 456_234, 478_456, 500_678, 522_901, 545_123,
      567_345, 589_567, 611_789, 634_012, 656_234, 678_456, 700_678, 722_901, 745_123, 767_345,
      789_567, 811_789, 834_012, 856_234, 878_456, 900_678, 922_901, 945_123, 967_345, 989_567,
    ],
  },
  {
    id: 28,
    pageTitle: 'Notifications - Alerts',
    status: 'Online',
    eventCount: 6745,
    users: 27_654,
    viewsPerUser: 4.9,
    averageTime: '3m 10s',
    conversions: [
      456_123, 478_345, 500_567, 522_789, 545_012, 567_234, 589_456, 611_678, 633_901, 656_123,
      678_345, 700_567, 722_789, 745_012, 767_234, 789_456, 811_678, 833_901, 856_123, 878_345,
      900_567, 922_789, 945_012, 967_234, 989_456, 1_011_678, 1_033_901, 1_056_123, 1_078_345,
      1_100_567,
    ],
  },
  {
    id: 29,
    pageTitle: 'Dashboard - Metrics',
    status: 'Offline',
    eventCount: 5678,
    users: 23_456,
    viewsPerUser: 6.3,
    averageTime: '2m 50s',
    conversions: [
      567_890, 590_112, 612_334, 634_556, 656_778, 678_990, 701_212, 723_434, 745_656, 767_878,
      790_100, 812_322, 834_544, 856_766, 878_988, 901_210, 923_432, 945_654, 967_876, 990_098,
      1_012_320, 1_034_542, 1_056_764, 1_078_986, 1_101_208, 1_123_430, 1_145_652, 1_167_874,
      1_190_096, 1_212_318,
    ],
  },
  {
    id: 30,
    pageTitle: 'Reports - Monthly Analysis',
    status: 'Online',
    eventCount: 7890,
    users: 34_567,
    viewsPerUser: 5.9,
    averageTime: '3m 20s',
    conversions: [
      678_901, 701_123, 723_345, 745_567, 767_789, 790_011, 812_233, 834_455, 856_677, 878_899,
      901_121, 923_343, 945_565, 967_787, 990_009, 1_012_231, 1_034_453, 1_056_675, 1_078_897,
      1_101_119, 1_123_341, 1_145_563, 1_167_785, 1_190_007, 1_212_229, 1_234_451, 1_256_673,
      1_278_895, 1_301_117, 1_323_339,
    ],
  },
  {
    id: 31,
    pageTitle: 'Training - Employee Onboarding',
    status: 'Offline',
    eventCount: 3456,
    users: 19_234,
    viewsPerUser: 6.1,
    averageTime: '3m 10s',
    conversions: [
      789_012, 811_234, 833_456, 855_678, 877_890, 900_112, 922_334, 944_556, 966_778, 989_000,
      1_011_222, 1_033_444, 1_055_666, 1_077_888, 1_100_110, 1_122_332, 1_144_554, 1_166_776,
      1_188_998, 1_211_220, 1_233_442, 1_255_664, 1_277_886, 1_300_108, 1_322_330, 1_344_552,
      1_366_774, 1_388_996, 1_411_218, 1_433_440,
    ],
  },
  {
    id: 32,
    pageTitle: 'Resources - Knowledge Base',
    status: 'Online',
    eventCount: 5678,
    users: 23_456,
    viewsPerUser: 4.7,
    averageTime: '3m 25s',
    conversions: [
      890_123, 912_345, 934_567, 956_789, 979_012, 1_001_234, 1_023_456, 1_045_678, 1_067_890,
      1_090_123, 1_112_345, 1_134_567, 1_156_789, 1_179_012, 1_201_234, 1_223_456, 1_245_678,
      1_267_890, 1_290_123, 1_312_345, 1_334_567, 1_356_789, 1_379_012, 1_401_234, 1_423_456,
      1_445_678, 1_467_890, 1_490_123, 1_512_345, 1_534_567,
    ],
  },
  {
    id: 33,
    pageTitle: 'Settings - Privacy Controls',
    status: 'Offline',
    eventCount: 6789,
    users: 27_689,
    viewsPerUser: 5.8,
    averageTime: '3m 05s',
    conversions: [
      901_234, 923_456, 945_678, 967_890, 990_112, 1_012_334, 1_034_556, 1_056_778, 1_079_000,
      1_101_222, 1_123_444, 1_145_666, 1_167_888, 1_190_110, 1_212_332, 1_234_554, 1_256_776,
      1_278_998, 1_301_220, 1_323_442, 1_345_664, 1_367_886, 1_390_108, 1_412_330, 1_434_552,
      1_456_774, 1_478_996, 1_501_218, 1_523_440, 1_545_662,
    ],
  },
  {
    id: 34,
    pageTitle: 'Integrations - Third-Party Services',
    status: 'Online',
    eventCount: 4567,
    users: 19_345,
    viewsPerUser: 4.4,
    averageTime: '2m 50s',
    conversions: [
      123_457, 145_679, 167_891, 190_113, 212_335, 234_557, 256_779, 279_001, 301_223, 323_445,
      345_667, 367_889, 390_011, 412_233, 434_455, 456_677, 478_899, 501_121, 523_343, 545_565,
      567_787, 590_009, 612_231, 634_453, 656_675, 678_897, 701_119, 723_341, 745_563, 767_785,
    ],
  },
  {
    id: 35,
    pageTitle: 'Account - Billing Information',
    status: 'Offline',
    eventCount: 7890,
    users: 34_567,
    viewsPerUser: 5.4,
    averageTime: '3m 00s',
    conversions: [
      234_568, 256_790, 278_912, 301_134, 323_356, 345_578, 367_790, 390_012, 412_234, 434_456,
      456_678, 478_890, 501_112, 523_334, 545_556, 567_778, 590_000, 612_222, 634_444, 656_666,
      678_888, 701_110, 723_332, 745_554, 767_776, 789_998, 812_220, 834_442, 856_664, 878_886,
    ],
  },
];
