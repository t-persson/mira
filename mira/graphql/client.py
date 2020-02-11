"""Hello 2020."""
from gql import Client, gql
from gql.transport.requests import RequestsHTTPTransport


class GraphqlClient:
    """Graphql client interface."""

    def __init__(self, host):
        """Init Graphql client.

        :param host: Host target
        :type host: str
        """
        transport = RequestsHTTPTransport(host)
        self.client = Client(transport=transport)

    def query(self, query):
        """Send query to graphql endpoint.

        :param query: Query to execute
        :type query: str
        :return: Graphql response
        :rtype: dict
        """
        return self.client.execute(gql(query))


