variable "do_token" {
  description = "DigitalOcean Personal API token"
  type        = string
}

variable "resend_api_key" {
  description = "Resend.com API token"
  type        = string
}

variable "replica_count" {
  description = "Number of replicas"
  type        = number
  default     = 2
}

variable "connection_pool_size" {
  description = "Connection pool size"
  type        = number
  default     = 22
}

variable "domain" {
  description = "Domain name"
  type        = string
}

variable "instance_size_slug" {
  description = "Slug of size of all instances"
  type        = string
  default     = "basic-xxs"
}

variable "instance_count" {
  description = "Number of service instances"
  type        = number
  default     = 1
}

variable "db_size_slug" {
  description = "Slug of size of all db instances"
  type        = string
  default     = "db-s-1vcpu-1gb"
}

variable "db_node_count" {
  description = "Number of db nodes in cluster"
  type        = number
  default     = 1
}
