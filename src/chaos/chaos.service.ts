import { Injectable } from '@nestjs/common';
import { isIP } from 'is-ip';
import { ApiServiceFetcherService } from 'src/shared/api-service-fetcher/api-service-fetcher.service';

@Injectable()
export class ChaosService {
  constructor(private readonly apiClientService: ApiServiceFetcherService) {}

  async findAll() {
    const allEndpointsData =
      await this.apiClientService.getEndpointsFromOtherServer();
    const vulnerabilitiesData = await this.getAllVulnerabilities();
    const allVulnerabilitiesMap = {};
    allEndpointsData.map((endPoint) => {
      if (isIP(endPoint['ip'])) {
        const endPointID = endPoint['endpoint_id'];
        const vulsById = vulnerabilitiesData
          .filter((v) => v['endpoint_id'] === endPointID)
          .map((v) => v['CVE']);
        allVulnerabilitiesMap[endPoint['ip']] = {
          vulnerabilities: vulsById,
        };
      }
    });
    return Object.entries(allVulnerabilitiesMap).map(([ip, data]) => ({
      ip,
      vulnerabilities: data['vulnerabilities'],
    }));
  }

  async getAllVulnerabilities() {
    const allData = [];
    let page = 0;
    let size = 10;
    let currentVul: [] =
      await this.apiClientService.getVulnerabilitiesFromOtherServer({
        page,
        size,
      });
    while (currentVul) {
      allData.concat(currentVul);
      page += 1;
      size += 10;
      setTimeout(async () => {
        currentVul =
          await this.apiClientService.getVulnerabilitiesFromOtherServer({
            page,
            size,
          });
        return;
      }, 1500);
    }

    return allData;
  }
}
