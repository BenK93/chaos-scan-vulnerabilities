import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class ApiServiceFetcherService {
  private readonly apiUrl = 'http://98.71.235.115:8000/api';
  private token: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJudWdnZXRzIjoxMiwiYmlnTWFjIjoxLCJpYXQiOjE3MDU5MzkyOTcsImV4cCI6MTcwNTkzOTQ3N30.TBeb9XucZF1KzypFDGmcvU38Gg-uNhnYwNCjRx1PdEM';
  async getEndpointsFromOtherServer(): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/endpoints`, {
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error.message);
      throw error;
    }
  }
  async getVulnerabilitiesFromOtherServer({
    page,
    size,
  }: {
    page: number;
    size: number;
  }): Promise<[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/vulnerabilities`, {
        params: {
          page,
          size,
        },
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error.message);
      throw error;
    }
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async createTokenPeriodically(): Promise<any> {
    const api_veriti =
      '157Xl9eY15gg15zXoNeVINeR16HXmden16jXmNeZ150sINeQ15TXkdeq15k=';
    try {
      const response = await axios.post(`${this.apiUrl}/token/create`, {
        apiKey: api_veriti,
      });
      console.log(response);
      this.token = response.data;
      return response.data;
    } catch (error) {
      console.error('Error posting data:', error.message);
      throw error;
    }
  }
}
