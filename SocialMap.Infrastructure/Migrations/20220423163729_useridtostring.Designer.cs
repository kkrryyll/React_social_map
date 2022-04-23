﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SocialMap.Infrastructure.Repositories;

namespace SocialMap.Infrastructure.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20220423163729_useridtostring")]
    partial class useridtostring
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("SocialMap.Core.Domain.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Category");
                });

            modelBuilder.Entity("SocialMap.Core.Domain.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("POIId")
                        .HasColumnType("int");

                    b.Property<DateTime>("PublicationDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("POIId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("SocialMap.Core.Domain.Like", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("POIId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("POIId");

                    b.ToTable("Likes");
                });

            modelBuilder.Entity("SocialMap.Core.Domain.POI", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int?>("CategoryId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsAccepted")
                        .HasColumnType("bit");

                    b.Property<bool>("IsGlobal")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("X")
                        .HasColumnType("float");

                    b.Property<double>("Y")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("POI");
                });

            modelBuilder.Entity("SocialMap.Core.Domain.POIAccess", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<bool>("IsAccpeted")
                        .HasColumnType("bit");

                    b.Property<int>("POIId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("POIId");

                    b.ToTable("POIAccess");
                });

            modelBuilder.Entity("SocialMap.Core.Domain.Comment", b =>
                {
                    b.HasOne("SocialMap.Core.Domain.POI", "POI")
                        .WithMany("Comments")
                        .HasForeignKey("POIId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("POI");
                });

            modelBuilder.Entity("SocialMap.Core.Domain.Like", b =>
                {
                    b.HasOne("SocialMap.Core.Domain.POI", null)
                        .WithMany("Likes")
                        .HasForeignKey("POIId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SocialMap.Core.Domain.POI", b =>
                {
                    b.HasOne("SocialMap.Core.Domain.Category", "Category")
                        .WithMany("POIs")
                        .HasForeignKey("CategoryId");

                    b.Navigation("Category");
                });

            modelBuilder.Entity("SocialMap.Core.Domain.POIAccess", b =>
                {
                    b.HasOne("SocialMap.Core.Domain.POI", null)
                        .WithMany("POIAccesses")
                        .HasForeignKey("POIId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SocialMap.Core.Domain.Category", b =>
                {
                    b.Navigation("POIs");
                });

            modelBuilder.Entity("SocialMap.Core.Domain.POI", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("Likes");

                    b.Navigation("POIAccesses");
                });
#pragma warning restore 612, 618
        }
    }
}
