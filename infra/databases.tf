resource "digitalocean_database_cluster" "demo_sentry_db" {
  name       = "demo-sentry-db-cluster"
  engine     = "pg"
  version    = "15"
  region     = "sgp1"
  size       = var.db_size_slug
  node_count = var.db_node_count

  private_network_uuid = digitalocean_vpc.demo_sentry.id
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
  size       = var.connection_pool_size

  user    = digitalocean_database_cluster.demo_sentry_db.user
  db_name = digitalocean_database_cluster.demo_sentry_db.database
}

resource "digitalocean_database_replica" "demo_sentry_db" {
  count      = var.replica_count
  cluster_id = digitalocean_database_cluster.demo_sentry_db.id
  name       = "demo-sentry-db-replica-${count.index}"
  region     = "sgp1"
  size       = var.db_size_slug

  private_network_uuid = digitalocean_vpc.demo_sentry.id
}

resource "digitalocean_database_firewall" "demo_sentry_db_replica" {
  count      = var.replica_count
  cluster_id = digitalocean_database_replica.demo_sentry_db[count.index].uuid

  rule {
    type  = "app"
    value = digitalocean_app.demo_sentry.id
  }
}
