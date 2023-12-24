resource "digitalocean_database_cluster" "demo_sentry_db" {
  name       = "demo-sentry-db-cluster"
  engine     = "pg"
  version    = "15"
  size       = "db-s-1vcpu-1gb"
  region     = "sgp1"
  node_count = 1

  private_network_uuid = digitalocean_vpc.network.id
  project_id           = digitalocean_project.demo_sentry.id
}

resource "digitalocean_database_firewall" "demo_sentry_db" {
  cluster_id = digitalocean_database_cluster.demo_sentry_db.id

  rule {
    type  = "app"
    value = digitalocean_app.demo_sentry.id
  }
}

resource "digitalocean_database_connection_pool" "demo_sentry_db" {
  cluster_id = digitalocean_database_cluster.demo_sentry_db.id
  name       = "demo-sentry-db-pool"
  mode       = "transaction"
  size       = 5
  db_name    = digitalocean_database_cluster.demo_sentry_db.database
}

resource "digitalocean_database_replica" "demo_sentry_db_1" {
  cluster_id = digitalocean_database_cluster.demo_sentry_db.id
  name       = "demo-sentry-db-replica-1"
  size       = "db-s-1vcpu-1gb"
  region     = "sgp1"

  private_network_uuid = digitalocean_vpc.network.id
}

resource "digitalocean_database_firewall" "demo_sentry_db_1" {
  cluster_id = digitalocean_database_replica.demo_sentry_db_1.uuid

  rule {
    type  = "app"
    value = digitalocean_app.demo_sentry.id
  }
}

resource "digitalocean_database_replica" "demo_sentry_db_2" {
  cluster_id = digitalocean_database_cluster.demo_sentry_db.id
  name       = "demo-sentry-db-replica-2"
  size       = "db-s-1vcpu-1gb"
  region     = "sgp1"

  private_network_uuid = digitalocean_vpc.network.id
}

resource "digitalocean_database_firewall" "demo_sentry_db_2" {
  cluster_id = digitalocean_database_replica.demo_sentry_db_2.uuid

  rule {
    type  = "app"
    value = digitalocean_app.demo_sentry.id
  }
}
